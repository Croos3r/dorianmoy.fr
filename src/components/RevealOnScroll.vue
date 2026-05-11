<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

withDefaults(
	defineProps<{
		delay?: number;
		y?: number;
	}>(),
	{ delay: 0, y: 16 },
);

const el = ref<HTMLElement | null>(null);
const shown = ref(false);
let ob: IntersectionObserver | null = null;

onMounted(() => {
	if (!el.value) return;
	ob = new IntersectionObserver(
		([e]) => {
			if (e.isIntersecting) {
				shown.value = true;
				ob?.disconnect();
			}
		},
		{ threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
	);
	ob.observe(el.value);
});
onBeforeUnmount(() => ob?.disconnect());
</script>

<template>
	<div
		ref="el"
		:style="{
			transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
			opacity: shown ? 1 : 0,
			transition: `transform .7s cubic-bezier(.2,.7,.2,1) ${delay}ms, opacity .7s ease ${delay}ms`,
		}"
	>
		<slot />
	</div>
</template>
