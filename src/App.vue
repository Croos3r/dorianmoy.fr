<script lang="ts" setup>
import { computed, defineAsyncComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import TitleBar from "./components/TitleBar.vue";
import SideBar, { type FileEntry } from "./components/SideBar.vue";
import StatusBar from "./components/StatusBar.vue";
import HeroSection from "./sections/HeroSection.vue";
import AboutSection from "./sections/AboutSection.vue";
import StackSection from "./sections/StackSection.vue";
import ProjectsSection from "./sections/ProjectsSection.vue";
import ContactSection from "./sections/ContactSection.vue";
import { useEditorKeys } from "./composables/useEditorKeys";
import { useScrollSpy } from "./composables/useScrollSpy";
import { PORTFOLIO, type Project } from "./lib/portfolio";

// Interaction-gated modals: lazy-loaded so their code isn't parsed/executed
// during the initial mount (shrinks the long main-thread task + initial chunk).
const ProjectModal = defineAsyncComponent(() => import("./components/ProjectModal.vue"));
const VimErrorModal = defineAsyncComponent(() => import("./components/VimErrorModal.vue"));

type VimError = { code: string; message: string };
const E45: VimError = {
	code: "E45",
	message: "E45: 'readonly' option is set (add ! to override)",
};
const E212: VimError = {
	code: "E212",
	message: "E212: Can't open file for writing: permission denied",
};

const { t } = useI18n();

const files: FileEntry[] = [
	{ id: "about", name: "about.md", type: "markdown" },
	{ id: "competencies", name: "stack.yaml", type: "yaml" },
	{ id: "projects", name: "projects/", type: "dir" },
	{ id: "contact", name: "contact.ts", type: "typescript" },
];

// Two intentionally-independent cursors, vim-style: `active` is the section
// currently in view (driven by the scrollspy, highlights the open "file" and
// status bar), while `selIdx` is the keyboard selection cursor in the sidebar
// (moved by j/k/g/G). Scrolling updates `active` but leaves the selection put;
// pressing Enter on the selection syncs both via navigate().
const active = ref("about");
const selIdx = ref(0);
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

useScrollSpy({ root: mainEl, sections: sectionRefs, active });

const downloadResume = () => {
	const a = document.createElement("a");
	a.href = t("resume.url");
	a.download = t("resume.filename");
	document.body.appendChild(a);
	a.click();
	a.remove();
};
const openSocial = (idx: number) => {
	const href = PORTFOLIO.socials[idx]?.href;
	if (href && href !== "#") window.open(href, "_blank", "noopener,noreferrer");
};

const { mode } = useEditorKeys({
	itemCount: () => files.length,
	selIdx,
	onOpen: (idx) => navigate(files[idx].id, idx),
	onResume: downloadResume,
	onSocial: openSocial,
	isModalOpen: () => modalProject.value !== null || vimError.value !== null,
	onWriteQuit: () => (vimError.value = E45),
	onForceWriteQuit: () => (vimError.value = E212),
	onForceQuit: () => (window.location.href = "about:blank"),
});
</script>

<template>
	<div
		id="terminal-root"
		class="v2-root grid h-screen grid-rows-[42px_1fr_28px] overflow-hidden bg-bg font-sans text-fg"
	>
		<TitleBar />

		<div class="v2-body grid min-h-0 grid-cols-[240px_1fr] @max-[820px]:grid-cols-1">
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
