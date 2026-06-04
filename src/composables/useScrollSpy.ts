import { onBeforeUnmount, onMounted, type Ref } from "vue";

type ScrollSpyOptions = {
	/** The scrolling pane that contains the sections. */
	root: Ref<HTMLElement | null>;
	/** Live map of section id → element, populated by template refs. */
	sections: Record<string, HTMLElement | null>;
	/** Updated with the id of the section currently considered active. */
	active: Ref<string>;
};

/**
 * Tracks which section is in view within a scrolling pane and writes its id to
 * `active`. Uses an IntersectionObserver for visibility ratios plus a
 * rAF-batched scroll handler so the near-bottom check never forces a synchronous
 * reflow per scroll event.
 */
export function useScrollSpy({ root, sections, active }: ScrollSpyOptions) {
	let observer: IntersectionObserver | null = null;
	let onScroll: (() => void) | null = null;
	// Re-entrancy guard: collapse a burst of scroll events into one rAF read.
	let ticking = false;

	onMounted(() => {
		const el = root.value;
		if (!el) return;

		const ids = Object.keys(sections);
		const visibility = new Map(ids.map((id) => [id, 0]));

		const pickActive = () => {
			const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 40;
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
				root: el,
				rootMargin: "0px 0px -55% 0px",
				threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
			},
		);

		for (const id of ids) {
			const section = sections[id];
			if (section) {
				section.dataset.sectionId = id;
				observer.observe(section);
			}
		}

		onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				ticking = false;
				pickActive();
			});
		};
		el.addEventListener("scroll", onScroll, { passive: true });
	});

	onBeforeUnmount(() => {
		observer?.disconnect();
		if (onScroll && root.value) root.value.removeEventListener("scroll", onScroll);
	});
}
