<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { TECH_REGISTRY } from "../lib/techRegistry";

const props = withDefaults(
	defineProps<{
		name: string;
		size?: number;
	}>(),
	{ size: 22 },
);

const entry = computed(() => TECH_REGISTRY[props.name]);
const pad = computed(() => Math.max(3, Math.round(props.size * 0.16)));
const url = computed(() =>
	entry.value ? `https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${entry.value.slug}.svg` : "",
);
const fallbackMono = computed(() => {
	if (entry.value?.mono) return entry.value.mono;
	return props.name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2) || "?";
});

// Probe the CDN: if the slug doesn't resolve, fall back to the monogram tile.
const failed = ref(false);
watch(
	url,
	(u) => {
		failed.value = false;
		if (!u) return;
		const img = new Image();
		img.onerror = () => {
			failed.value = true;
		};
		img.src = u;
	},
	{ immediate: true },
);

const useMonogram = computed(() => !entry.value || failed.value);
const monoBg = computed(() => (entry.value && failed.value ? "#" + entry.value.hex : "rgb(120,120,120)"));
const monoFg = computed(() => (entry.value && failed.value ? entry.value.fg || "#fff" : "#fff"));
</script>

<template>
	<span
		v-if="!useMonogram"
		:title="name"
		:aria-label="name"
		role="img"
		class="inline-flex shrink-0 items-center justify-center rounded-[5px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.08)_inset]"
		:style="{
			width: size + 'px',
			height: size + 'px',
			background: '#' + entry!.hex,
			padding: pad + 'px',
		}"
	>
		<span
			class="inline-block h-full w-full"
			:style="{
				background: entry!.fg || '#ffffff',
				WebkitMask: `url(&quot;${url}&quot;) center / contain no-repeat`,
				mask: `url(&quot;${url}&quot;) center / contain no-repeat`,
			}"
		/>
	</span>
	<span
		v-else
		:title="name"
		class="inline-flex shrink-0 items-center justify-center rounded-[5px] font-mono font-bold tracking-tight shadow-[0_0_0_0.5px_rgba(0,0,0,0.08)_inset]"
		:style="{
			width: size + 'px',
			height: size + 'px',
			background: monoBg,
			color: monoFg,
			fontSize: Math.round(size * 0.42) + 'px',
			lineHeight: 1,
		}"
	>
		{{ fallbackMono }}
	</span>
</template>
