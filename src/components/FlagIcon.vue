<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(defineProps<{ code: "fr" | "en"; w?: number }>(), {
	w: 14,
});
const h = computed(() => (props.w * 2) / 3);
</script>

<template>
	<svg
		v-if="code === 'fr'"
		:width="w"
		:height="h"
		viewBox="0 0 18 12"
		aria-hidden="true"
		class="block shrink-0 rounded-[1.5px] shadow-[0_0_0_0.5px_var(--c-flag-shadow)]"
	>
		<rect x="0" y="0" width="6" height="12" fill="#0055A4" />
		<rect x="6" y="0" width="6" height="12" fill="#FFFFFF" />
		<rect x="12" y="0" width="6" height="12" fill="#EF4135" />
	</svg>
	<svg
		v-else
		:width="w"
		:height="h"
		viewBox="0 0 60 40"
		aria-hidden="true"
		class="block shrink-0 rounded-[1.5px] shadow-[0_0_0_0.5px_var(--c-flag-shadow)]"
	>
		<rect width="60" height="40" fill="#012169" />
		<path d="M0,0 L60,40 M60,0 L0,40" stroke="#FFFFFF" stroke-width="8" />
		<path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" stroke-width="4" clip-path="url(#fl-en-cl)" />
		<defs>
			<clipPath id="fl-en-cl">
				<polygon points="0,0 30,20 0,40 0,40" />
				<polygon points="60,0 30,20 60,40 60,40" />
			</clipPath>
		</defs>
		<rect x="25" y="0" width="10" height="40" fill="#FFFFFF" />
		<rect x="0" y="15" width="60" height="10" fill="#FFFFFF" />
		<rect x="27" y="0" width="6" height="40" fill="#C8102E" />
		<rect x="0" y="17" width="60" height="6" fill="#C8102E" />
	</svg>
</template>
