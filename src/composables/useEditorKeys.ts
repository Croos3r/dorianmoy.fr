import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

type EditorKeysOptions = {
	/** Number of navigable items in the file list. */
	itemCount: () => number;
	/** Selection cursor index into the file list (mutated by motions). */
	selIdx: Ref<number>;
	/** Open the item at the given index (Enter). */
	onOpen: (_idx: number) => void;
	/** Download the résumé ("r). */
	onResume: () => void;
	/** Open the social link at the given index ("a / "b register marks). */
	onSocial: (_idx: number) => void;
	/** True when a modal is on screen — suppresses `w`/`wq` arming. */
	isModalOpen: () => boolean;
	/** `:wq` — readonly warning (E45). */
	onWriteQuit: () => void;
	/** `:wq!` — permission denied (E212). */
	onForceWriteQuit: () => void;
	/** `:q!` — bail to about:blank. */
	onForceQuit: () => void;
};

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

/**
 * Vim-flavoured keyboard layer for the editor shell: NORMAL/INSERT mode
 * tracking, j/k/g/G motions, the `"` register (résumé + socials), and the
 * `:w`/`:q`/`:wq`/`:wq!`/`:q!` ex-command escalation. Returns the current
 * `mode` for the status bar.
 */
export function useEditorKeys(opts: EditorKeysOptions) {
	const mode = ref<"NORMAL" | "INSERT">("NORMAL");

	// ── Mode tracker (NORMAL/INSERT) based on focused element type ──
	const onFocusIn = (e: FocusEvent) => {
		if (isTextField(e.target as Element)) mode.value = "INSERT";
	};
	const onFocusOut = () => {
		setTimeout(() => {
			mode.value = isTextField(document.activeElement) ? "INSERT" : "NORMAL";
		}, 0);
	};

	// ── `"` register marks ──
	let pendingReg = false;
	let pendingTimer: number | null = null;

	// ── vim-style ex commands ──
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
				opts.onResume();
			} else {
				const idx = ({ a: 0, b: 1 } as Record<string, number>)[k];
				if (idx != null) {
					e.preventDefault();
					opts.onSocial(idx);
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

		// `q!` and `wq!` are always live — even with a modal open — so the user
		// can rage-quit / hit the permission wall from anywhere on the site.
		if (pendingQ && e.key === "!") {
			e.preventDefault();
			disarmEx();
			opts.onForceQuit();
			return;
		}
		if (pendingWQ && e.key === "!") {
			e.preventDefault();
			disarmEx();
			opts.onForceWriteQuit();
			return;
		}
		// `wq` and lone `w` / `q` arming only make sense outside a modal, so they
		// don't fight the modal's own quit handlers.
		if (!opts.isModalOpen()) {
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
						opts.onWriteQuit();
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

		const last = Math.max(0, opts.itemCount() - 1);
		if (e.key === "j" || e.key === "ArrowDown") {
			e.preventDefault();
			opts.selIdx.value = Math.min(last, opts.selIdx.value + 1);
		} else if (e.key === "k" || e.key === "ArrowUp") {
			e.preventDefault();
			opts.selIdx.value = Math.max(0, opts.selIdx.value - 1);
		} else if (e.key === "g") {
			e.preventDefault();
			opts.selIdx.value = 0;
		} else if (e.key === "G") {
			e.preventDefault();
			opts.selIdx.value = last;
		} else if (e.key === "Enter") {
			e.preventDefault();
			opts.onOpen(opts.selIdx.value);
		}
	};

	onMounted(() => {
		document.addEventListener("focusin", onFocusIn);
		document.addEventListener("focusout", onFocusOut);
		window.addEventListener("keydown", onKey);
	});

	onBeforeUnmount(() => {
		document.removeEventListener("focusin", onFocusIn);
		document.removeEventListener("focusout", onFocusOut);
		window.removeEventListener("keydown", onKey);
		if (pendingTimer) clearTimeout(pendingTimer);
		disarmEx();
	});

	return { mode };
}
