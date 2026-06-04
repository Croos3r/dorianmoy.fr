import { onScopeDispose, watch, type Ref } from "vue";

// Ref-counted body scroll lock. Multiple overlays (project modal, vim-error
// modal) can request a lock independently; the page only unlocks once every
// holder has released. A plain `body.style.overflow = ""` per component races:
// the last component to unmount would unlock the page even while another
// overlay is still open.
let lockCount = 0;

const apply = () => {
	if (typeof document === "undefined") return;
	document.body.style.overflow = lockCount > 0 ? "hidden" : "";
};

/**
 * Locks body scroll while `active` is truthy. Safe to use from several
 * components at once — locks are reference-counted across all callers.
 */
export function useBodyScrollLock(active: Ref<boolean>) {
	let held = false;
	const setHeld = (next: boolean) => {
		if (next === held) return;
		held = next;
		lockCount += next ? 1 : -1;
		apply();
	};

	watch(active, (v) => setHeld(!!v), { immediate: true });
	onScopeDispose(() => setHeld(false));
}
