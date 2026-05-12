<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import TitleBar from "./components/TitleBar.vue";
import SideBar, { type FileEntry } from "./components/SideBar.vue";
import StatusBar from "./components/StatusBar.vue";
import HeroSection from "./sections/HeroSection.vue";
import AboutSection from "./sections/AboutSection.vue";
import StackSection from "./sections/StackSection.vue";
import ProjectsSection from "./sections/ProjectsSection.vue";
import ContactSection from "./sections/ContactSection.vue";
import ProjectModal from "./components/ProjectModal.vue";
import VimErrorModal from "./components/VimErrorModal.vue";

type VimError = { code: string; message: string };
const E45: VimError = {
	code: "E45",
	message: "E45: 'readonly' option is set (add ! to override)",
};
const E212: VimError = {
	code: "E212",
	message: "E212: Can't open file for writing: permission denied",
};
import { PORTFOLIO, type Project } from "./lib/portfolio";

const { t } = useI18n();

const files: FileEntry[] = [
	{ id: "about", name: "about.md", type: "markdown" },
	{ id: "competencies", name: "stack.yaml", type: "yaml" },
	{ id: "projects", name: "projects/", type: "dir" },
	{ id: "contact", name: "contact.ts", type: "typescript" },
];

const active = ref("about");
const selIdx = ref(0);
const mode = ref<"NORMAL" | "INSERT">("NORMAL");
const modalProject = ref<Project | null>(null);
const vimError = ref<VimError | null>(null);

const activeIdx = computed(() =>
	Math.max(
		0,
		files.findIndex((f) => f.id === active.value),
	),
);
const activeFile = computed(() => files[activeIdx.value]);
const FILE_TYPE_SHORT: Record<FileEntry["type"], string> = {
	markdown: "md",
	yaml: "yaml",
	dir: "dir",
	typescript: "ts",
};
const activeFileTypeLabel = computed(() => FILE_TYPE_SHORT[activeFile.value.type]);

const mainEl = ref<HTMLElement | null>(null);
const sectionRefs: Record<string, HTMLElement | null> = {
	about: null,
	competencies: null,
	projects: null,
	contact: null,
};
const setSectionRef = (id: string) => (el: unknown) => {
	sectionRefs[id] = (el as HTMLElement | null) ?? null;
};

const navigate = (id: string, idx: number) => {
	selIdx.value = idx;
	active.value = id;
	sectionRefs[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
};

// ── Mode tracker (NORMAL/INSERT) based on focused element type ──
const isTextField = (el: Element | null) => {
	if (!el) return false;
	const tag = el.tagName;
	if (tag === "TEXTAREA") return true;
	if (tag === "INPUT") {
		const type = (el.getAttribute("type") || "text").toLowerCase();
		return ["text", "email", "search", "url", "tel", "password", "number"].includes(type);
	}
	return (el as HTMLElement).isContentEditable === true;
};
const onFocusIn = (e: FocusEvent) => {
	if (isTextField(e.target as Element)) mode.value = "INSERT";
};
const onFocusOut = () => {
	setTimeout(() => {
		mode.value = isTextField(document.activeElement) ? "INSERT" : "NORMAL";
	}, 0);
};

// ── Keyboard motions ──
let pendingReg = false;
let pendingTimer: number | null = null;
// vim-style ex commands:
//   wq   -> E45 readonly warning
//   wq!  -> E212 permission denied
//   q!   -> redirect to about:blank
let pendingW = false;
let pendingQ = false;
let pendingWQ = false;
let exTimer: number | null = null;
let wqGraceTimer: number | null = null;
const armEx = (kind: "w" | "q") => {
	pendingW = kind === "w";
	pendingQ = kind === "q";
	pendingWQ = false;
	if (exTimer) clearTimeout(exTimer);
	exTimer = window.setTimeout(() => {
		pendingW = false;
		pendingQ = false;
	}, 1200);
};
const disarmEx = () => {
	pendingW = false;
	pendingQ = false;
	pendingWQ = false;
	if (exTimer) clearTimeout(exTimer);
	if (wqGraceTimer) clearTimeout(wqGraceTimer);
};
const onKey = (e: KeyboardEvent) => {
	const tgt = e.target as HTMLElement | null;
	if (tgt?.tagName === "INPUT" || tgt?.tagName === "TEXTAREA" || tgt?.isContentEditable) return;
	if (e.metaKey || e.ctrlKey || e.altKey) return;

	if (pendingReg) {
		const k = e.key.toLowerCase();
		if (k === "r") {
			e.preventDefault();
			const a = document.createElement("a");
			a.href = t("resume.url");
			a.download = t("resume.filename");
			document.body.appendChild(a);
			a.click();
			a.remove();
		} else {
			const idx = ({ a: 0, b: 1 } as Record<string, number>)[k];
			if (idx != null && PORTFOLIO.socials[idx]) {
				e.preventDefault();
				const href = PORTFOLIO.socials[idx].href;
				if (href && href !== "#") window.open(href, "_blank", "noopener,noreferrer");
			}
		}
		pendingReg = false;
		if (pendingTimer) clearTimeout(pendingTimer);
		return;
	}

	if (e.key === '"') {
		e.preventDefault();
		pendingReg = true;
		if (pendingTimer) clearTimeout(pendingTimer);
		pendingTimer = window.setTimeout(() => (pendingReg = false), 1200);
		return;
	}

	// vim-style ex commands.
	// `q!` and `wq!` are always live — even with a modal open — so the user
	// can rage-quit / hit the permission wall from anywhere on the site.
	if (pendingQ && e.key === "!") {
		e.preventDefault();
		disarmEx();
		window.location.href = "about:blank";
		return;
	}
	if (pendingWQ && e.key === "!") {
		e.preventDefault();
		disarmEx();
		vimError.value = E212;
		return;
	}
	// `wq` and lone `w` / `q` arming only make sense outside a modal, so they
	// don't fight the modal's own quit handlers.
	if (!modalProject.value && !vimError.value) {
		if (pendingW && e.key === "q") {
			e.preventDefault();
			pendingW = false;
			pendingQ = false;
			pendingWQ = true;
			if (exTimer) clearTimeout(exTimer);
			// Short grace window: if `!` lands quickly, escalate to E212;
			// otherwise fall back to E45.
			if (wqGraceTimer) clearTimeout(wqGraceTimer);
			wqGraceTimer = window.setTimeout(() => {
				if (pendingWQ) {
					pendingWQ = false;
					vimError.value = E45;
				}
			}, 250);
			return;
		}
		if (e.key === "w") {
			e.preventDefault();
			armEx("w");
			return;
		}
	}
	// `q` arms pendingQ everywhere so the `!` follow-up works regardless of
	// whether a modal is on screen.
	if (e.key === "q") {
		armEx("q");
		return;
	}
	disarmEx();

	if (e.key === "j" || e.key === "ArrowDown") {
		e.preventDefault();
		selIdx.value = Math.min(files.length - 1, selIdx.value + 1);
	} else if (e.key === "k" || e.key === "ArrowUp") {
		e.preventDefault();
		selIdx.value = Math.max(0, selIdx.value - 1);
	} else if (e.key === "g") {
		e.preventDefault();
		selIdx.value = 0;
	} else if (e.key === "G") {
		e.preventDefault();
		selIdx.value = files.length - 1;
	} else if (e.key === "Enter") {
		e.preventDefault();
		navigate(files[selIdx.value].id, selIdx.value);
	}
};

// ── Scrollspy ──
let observer: IntersectionObserver | null = null;
let onScroll: (() => void) | null = null;

onMounted(() => {
	document.addEventListener("focusin", onFocusIn);
	document.addEventListener("focusout", onFocusOut);
	window.addEventListener("keydown", onKey);

	const root = mainEl.value;
	if (root) {
		const ids = Object.keys(sectionRefs);
		const visibility = new Map(ids.map((id) => [id, 0]));
		const pickActive = () => {
			const nearBottom = root.scrollTop + root.clientHeight >= root.scrollHeight - 40;
			if (nearBottom) {
				active.value = ids[ids.length - 1];
				return;
			}
			let best: string | null = null;
			let bestRatio = 0;
			for (const [id, r] of visibility) {
				if (r > bestRatio) {
					bestRatio = r;
					best = id;
				}
			}
			if (best && bestRatio > 0) active.value = best;
		};
		observer = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					const id = (e.target as HTMLElement).dataset.sectionId;
					if (!id) continue;
					visibility.set(id, e.isIntersecting ? e.intersectionRatio : 0);
				}
				pickActive();
			},
			{
				root,
				rootMargin: "0px 0px -55% 0px",
				threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
			},
		);
		for (const id of ids) {
			const el = sectionRefs[id];
			if (el) {
				el.dataset.sectionId = id;
				observer.observe(el);
			}
		}
		onScroll = () => pickActive();
		root.addEventListener("scroll", onScroll, { passive: true });
	}
});

onBeforeUnmount(() => {
	document.removeEventListener("focusin", onFocusIn);
	document.removeEventListener("focusout", onFocusOut);
	window.removeEventListener("keydown", onKey);
	observer?.disconnect();
	if (onScroll && mainEl.value) mainEl.value.removeEventListener("scroll", onScroll);
	if (pendingTimer) clearTimeout(pendingTimer);
});
</script>

<template>
	<div
		id="terminal-root"
		class="v2-root grid h-screen grid-rows-[42px_1fr_28px] overflow-hidden bg-bg font-sans text-fg"
	>
		<TitleBar />

		<div class="v2-body @max-[820px]:grid-cols-1 grid min-h-0 grid-cols-[240px_1fr]">
			<SideBar :files="files" :active="active" :sel-idx="selIdx" @navigate="navigate" />
			<main ref="mainEl" class="v2-main overflow-y-auto overflow-x-hidden">
				<HeroSection />
				<div :ref="setSectionRef('about')"><AboutSection /></div>
				<div :ref="setSectionRef('competencies')"><StackSection /></div>
				<div :ref="setSectionRef('projects')">
					<ProjectsSection @open-project="(p) => (modalProject = p)" />
				</div>
				<div :ref="setSectionRef('contact')"><ContactSection /></div>
			</main>
		</div>

		<ProjectModal :project="modalProject" @close="modalProject = null" />
		<VimErrorModal
			:show="vimError !== null"
			:code="vimError?.code ?? ''"
			:message="vimError?.message ?? ''"
			@close="vimError = null"
		/>

		<StatusBar
			:mode="mode"
			:file-name="activeFile.name"
			:file-type="activeFileTypeLabel"
			:active-idx="activeIdx"
			:total="files.length"
		/>
	</div>
</template>
