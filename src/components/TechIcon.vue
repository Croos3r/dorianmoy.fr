<script lang="ts" setup>
import { computed, ref, watchEffect, type Ref } from "vue";
import { TECH_REGISTRY, type TechEntry, type TechName } from "../lib/techRegistry";

const props = withDefaults(
	defineProps<{
		name: TechName;
		size?: number;
	}>(),
	{ size: 22 },
);

// Annotated as the uniform TechEntry shape: `satisfies` on the registry keeps
// each entry's precise literal type (so optional `fg` would otherwise be absent
// on entries that omit it), but here we only care about the common interface.
const entry = computed<TechEntry>(() => TECH_REGISTRY[props.name]);
const pad = computed(() => Math.max(3, Math.round(props.size * 0.16)));
const url = computed(() =>
	entry.value.slug ? `https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${entry.value.slug}.svg` : "",
);
const fallbackMono = computed(() => entry.value.mono || props.name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2) || "?");

// simple-icons occasionally renames or removes slugs between releases (we pin
// v13); if the pinned slug 404s we fall back to the monogram tile. The probe
// result is memoized per URL at module scope so each unique slug is fetched
// once for the whole page rather than once per TechIcon instance.
const probeCache = new Map<string, Ref<boolean>>();
const probeFailed = (u: string): Ref<boolean> => {
	const cached = probeCache.get(u);
	if (cached) return cached;
	const failed = ref(false);
	probeCache.set(u, failed);
	const img = new Image();
	img.decoding = "async";
	img.onerror = () => (failed.value = true);
	img.src = u;
	return failed;
};

const failed = ref(false);
watchEffect(() => {
	// Reading the shared ref's `.value` keeps this effect subscribed, so a later
	// async probe failure flips this instance over to the monogram too.
	failed.value = url.value ? probeFailed(url.value).value : false;
});

// No icon slug, or a failed probe → render the monogram tile.
const useMonogram = computed(() => !entry.value.slug || failed.value);
const monoBg = computed(() => "#" + entry.value.hex);
const monoFg = computed(() => entry.value.fg || "#fff");
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
			background: '#' + entry.hex,
			padding: pad + 'px',
		}"
	>
		<span
			class="inline-block h-full w-full"
			:style="{
				background: entry.fg || '#ffffff',
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
