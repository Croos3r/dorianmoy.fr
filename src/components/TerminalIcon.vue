<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
	defineProps<{
		name: string;
		size?: number;
		stroke?: string;
		sw?: number;
	}>(),
	{ size: 20, stroke: "currentColor", sw: 1.5 },
);

const fill = computed(() => (props.name === "github" ? "currentColor" : "none"));
</script>

<template>
	<svg
		:width="size"
		:height="size"
		viewBox="0 0 24 24"
		:fill="fill"
		:stroke="stroke"
		:stroke-width="sw"
		stroke-linecap="round"
		stroke-linejoin="round"
		style="display: block; flex: none"
	>
		<template v-if="name === 'code'">
			<path d="M8 6 L2 12 L8 18" />
			<path d="M16 6 L22 12 L16 18" />
		</template>
		<template v-else-if="name === 'stack'">
			<path d="M3 7 L12 3 L21 7 L12 11 Z" />
			<path d="M3 12 L12 16 L21 12" />
			<path d="M3 17 L12 21 L21 17" />
		</template>
		<template v-else-if="name === 'tools'">
			<circle cx="12" cy="12" r="3" />
			<path d="M12 2 V5 M12 19 V22 M2 12 H5 M19 12 H22 M4.93 4.93 L7.05 7.05 M16.95 16.95 L19.07 19.07 M4.93 19.07 L7.05 16.95 M16.95 7.05 L19.07 4.93" />
		</template>
		<template v-else-if="name === 'branch'">
			<circle cx="6" cy="6" r="2" />
			<circle cx="6" cy="18" r="2" />
			<circle cx="18" cy="6" r="2" />
			<path d="M6 8 V16" />
			<path d="M6 12 C12 12 18 10 18 8" />
		</template>
		<template v-else-if="name === 'arrowUR'">
			<path d="M7 17 L17 7" />
			<path d="M7 7 H17 V17" />
		</template>
		<template v-else-if="name === 'sun'">
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2 V4 M12 20 V22 M2 12 H4 M20 12 H22 M4.93 4.93 L6.34 6.34 M17.66 17.66 L19.07 19.07 M4.93 19.07 L6.34 17.66 M17.66 6.34 L19.07 4.93" />
		</template>
		<template v-else-if="name === 'moon'">
			<path d="M20 14.5 A9 9 0 1 1 9.5 4 A7 7 0 0 0 20 14.5 Z" />
		</template>
		<template v-else-if="name === 'monitor'">
			<rect x="3" y="4" width="18" height="13" rx="1.5" />
			<path d="M8 21 H16 M12 17 V21" />
		</template>
		<template v-else-if="name === 'globe'">
			<circle cx="12" cy="12" r="9" />
			<ellipse cx="12" cy="12" rx="4" ry="9" />
			<path d="M3 12 H21" />
		</template>
		<template v-else-if="name === 'folder'">
			<path d="M3 6 L3 19 L21 19 L21 8 L12 8 L10 6 Z" />
		</template>
		<template v-else-if="name === 'download'">
			<path d="M12 3 V15" />
			<path d="M7 10 L12 15 L17 10" />
			<path d="M5 19 H19" />
		</template>
		<template v-else-if="name === 'send'">
			<path d="M3 11 L21 3 L13 21 L11 13 Z" />
			<path d="M11 13 L21 3" />
		</template>
		<template v-else-if="name === 'check'">
			<path d="M5 12 L10 17 L19 7" />
		</template>
	</svg>
</template>
