<script lang="ts" setup>
import { computed } from "vue";
import { PAL, MONO_STACK } from "../lib/palette";
import { themeTokens, isDark } from "../lib/theme";

export type SegmentedOption = {
	id: string;
	label: string;
	title?: string;
};

const props = defineProps<{
	options: SegmentedOption[];
	value: string;
	slotWidth: number;
	groupLabel: string;
}>();

const emit = defineEmits<{
	"update:value": [value: string];
}>();

const idx = computed(() =>
	Math.max(
		0,
		props.options.findIndex((o) => o.id === props.value),
	),
);

const onClick = (opt: SegmentedOption) => {
	if (opt.id === props.value) {
		// cycle to next slot (matches mobile pill behavior of design)
		const next = props.options[(idx.value + 1) % props.options.length];
		emit("update:value", next.id);
	} else {
		emit("update:value", opt.id);
	}
};
</script>

<template>
	<div
		role="group"
		:aria-label="groupLabel"
		class="v2-switch"
		:style="{
			position: 'relative',
			display: 'inline-flex',
			alignItems: 'center',
			padding: '2px',
			border: `1px solid ${themeTokens.border}`,
			borderRadius: '4px',
			background: themeTokens.switchBg,
			['--slot-w' as string]: slotWidth + 'px',
		}"
	>
		<span
			aria-hidden="true"
			class="v2-switch-thumb"
			:style="{
				position: 'absolute',
				top: '2px',
				bottom: '2px',
				left: '2px',
				width: 'var(--slot-w)',
				background: PAL.gold,
				borderRadius: '3px',
				transform: `translateX(calc(var(--slot-w) * ${idx}))`,
				transition: 'transform .28s cubic-bezier(.4,.0,.2,1), width .2s ease',
				willChange: 'transform',
			}"
		/>
		<button
			v-for="opt in options"
			:key="opt.id"
			class="v2-switch-slot"
			:aria-pressed="opt.id === value"
			:title="opt.title || opt.label"
			:aria-label="opt.title || opt.label"
			:style="{
				all: 'unset',
				cursor: 'pointer',
				position: 'relative',
				width: 'var(--slot-w)',
				boxSizing: 'border-box',
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '6px',
				padding: '4px 0',
				font: `500 11px/1 ${MONO_STACK}`,
				letterSpacing: '0.5px',
				color: opt.id === value ? PAL.ink : themeTokens.dim,
				transition: 'color .2s, width .2s ease',
			}"
			@click="onClick(opt)"
			@mouseenter="
				(e) => {
					if (opt.id !== value) (e.currentTarget as HTMLElement).style.color = isDark ? PAL.cream : PAL.ink;
				}
			"
			@mouseleave="
				(e) => {
					if (opt.id !== value) (e.currentTarget as HTMLElement).style.color = themeTokens.dim;
				}
			"
		>
			<slot name="icon" :option="opt" />
			<span class="v2-switch-label">{{ opt.label }}</span>
		</button>
	</div>
</template>
