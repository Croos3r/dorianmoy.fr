<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

const props = withDefaults(
	defineProps<{
		delay?: number;
		y?: number;
	}>(),
	{ delay: 0, y: 16 },
);

const el = ref<HTMLElement | null>(null);
const shown = ref(false);
let ob: IntersectionObserver | null = null;

// Find the nearest scrolling ancestor — the page's main pane scrolls, not the
// document, so an observer with `root: null` would see every element as already
// intersecting and reveal everything on mount instead of as the user scrolls.
//
// The scroll root is the same shared pane for every RevealOnScroll instance, so
// the DOM walk + getComputedStyle (a forced style/layout read) is memoized at
// module scope and runs at most once instead of once per instance on mount.
let cachedScrollRoot: Element | null | undefined;
const resolveScrollRoot = (start: HTMLElement): Element | null => {
	if (cachedScrollRoot !== undefined) return cachedScrollRoot;
	let cur: HTMLElement | null = start.parentElement;
	while (cur) {
		const overflowY = getComputedStyle(cur).overflowY;
		if (overflowY === "auto" || overflowY === "scroll") {
			cachedScrollRoot = cur;
			return cur;
		}
		cur = cur.parentElement;
	}
	cachedScrollRoot = null;
	return null;
};

onMounted(() => {
	if (!el.value) return;
	ob = new IntersectionObserver(
		([e]) => {
			if (e.isIntersecting) {
				shown.value = true;
				ob?.disconnect();
			}
		},
		{
			root: resolveScrollRoot(el.value),
			threshold: 0.15,
			rootMargin: "0px 0px -5% 0px",
		},
	);
	ob.observe(el.value);
});
onBeforeUnmount(() => ob?.disconnect());
</script>

<template>
	<div
		ref="el"
		:style="{
			transform: shown ? 'translateY(0)' : `translateY(${props.y}px)`,
			opacity: shown ? 1 : 0,
			transition: `transform .7s cubic-bezier(.2,.7,.2,1) ${props.delay}ms, opacity .7s ease ${props.delay}ms`,
		}"
	>
		<slot />
	</div>
</template>
