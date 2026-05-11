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

// Probe the CDN: if the slug doesn't resolve (e.g. tech is registered but
// simple-icons doesn't ship it), fall back to the monogram tile so the
// silhouette never silently disappears.
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
		:style="{
			width: size + 'px',
			height: size + 'px',
			borderRadius: '5px',
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			background: '#' + entry!.hex,
			flexShrink: 0,
			boxShadow: '0 0 0 0.5px rgba(0,0,0,0.08) inset',
			padding: pad + 'px',
		}"
	>
		<span
			:style="{
				width: '100%',
				height: '100%',
				background: entry!.fg || '#ffffff',
				WebkitMask: `url(&quot;${url}&quot;) center / contain no-repeat`,
				mask: `url(&quot;${url}&quot;) center / contain no-repeat`,
				display: 'inline-block',
			}"
		/>
	</span>
	<span
		v-else
		:title="name"
		:style="{
			width: size + 'px',
			height: size + 'px',
			borderRadius: '5px',
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			background: monoBg,
			color: monoFg,
			font: `700 ${Math.round(size * 0.42)}px/1 ui-monospace, Menlo, monospace`,
			letterSpacing: '-0.3px',
			flexShrink: 0,
			boxShadow: '0 0 0 0.5px rgba(0,0,0,0.08) inset',
		}"
	>
		{{ fallbackMono }}
	</span>
</template>
