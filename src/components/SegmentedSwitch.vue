<script lang="ts" setup>
import { computed } from "vue";

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
		class="v2-switch relative inline-flex items-center rounded border border-border bg-switch-bg p-0.5"
		:style="{ ['--slot-w' as string]: slotWidth + 'px' }"
	>
		<!-- Animated gold thumb behind the active slot. Hidden on phones where
		     the inactive slots collapse to nothing and the active slot becomes
		     a standalone pill. -->
		<span
			aria-hidden="true"
			class="v2-switch-thumb @max-[560px]:hidden absolute bottom-0.5 left-0.5 top-0.5 rounded-[3px] bg-gold transition-[transform,width] duration-300 ease-[cubic-bezier(.4,0,.2,1)] will-change-transform"
			:style="{
				width: 'var(--slot-w)',
				transform: `translateX(calc(var(--slot-w) * ${idx}))`,
			}"
		/>
		<button
			v-for="opt in options"
			:key="opt.id"
			type="button"
			class="v2-switch-slot @max-[560px]:px-2.5 @max-[560px]:py-1 @max-[560px]:aria-[pressed=false]:hidden @max-[560px]:aria-[pressed=true]:rounded-[3px] @max-[560px]:aria-[pressed=true]:bg-gold @max-[560px]:aria-[pressed=true]:text-ink relative inline-flex cursor-pointer items-center justify-center gap-1.5 border-0 bg-transparent px-0 py-1 font-mono text-[11px] font-medium leading-none tracking-wider transition-colors duration-200 aria-[pressed=false]:text-dim aria-[pressed=true]:text-ink aria-[pressed=false]:hover:text-ink dark:aria-[pressed=false]:hover:text-cream"
			:aria-pressed="opt.id === value"
			:title="opt.title || opt.label"
			:aria-label="opt.title || opt.label"
			:style="{ width: 'var(--slot-w)' }"
			@click="onClick(opt)"
		>
			<slot name="icon" :option="opt" />
			<span class="v2-switch-label @max-[560px]:hidden">{{ opt.label }}</span>
		</button>
	</div>
</template>

<style scoped>
/* The mobile pill drops the fixed slot width so the active slot hugs its content. */
@container (max-width: 560px) {
	.v2-switch-slot {
		width: auto !important;
	}
}
</style>
