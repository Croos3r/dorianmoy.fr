<script lang="ts" setup>
import TerminalIcon from "./TerminalIcon.vue";

defineProps<{
	mode: "NORMAL" | "INSERT";
	fileName: string;
	fileType: string;
	activeIdx: number;
	total: number;
}>();
</script>

<template>
	<footer
		class="v2-statusbar flex items-stretch border-t border-border bg-panel font-mono text-[11px] font-semibold leading-none text-dim @max-[820px]:flex-wrap @max-[820px]:gap-0 @max-[820px]:p-0 @max-[820px]:text-[10px] @max-[820px]:*:py-1.5"
	>
		<span
			class="inline-flex items-center px-3.5 tracking-widest transition-colors duration-150"
			:class="mode === 'INSERT' ? 'bg-tag-daily text-white' : 'bg-gold text-ink'"
			>{{ mode }}</span
		>
		<span class="inline-flex items-center gap-1.5 border-r border-border px-3">
			<TerminalIcon name="branch" :size="11" stroke="currentColor" />main
		</span>
		<span class="inline-flex items-center px-3 font-medium text-fg">{{ fileName }}</span>
		<span class="flex-1" />
		<span class="inline-flex items-center border-l border-border px-3">{{ fileType }}</span>
		<span class="inline-flex items-center border-l border-border px-3 @max-[560px]:hidden">utf-8</span>
		<span class="inline-flex items-center border-l border-border px-3 @max-[560px]:hidden">LF</span>
		<span class="inline-flex items-center bg-gold px-3.5 tracking-wider text-ink">{{ activeIdx + 1 }}/{{ total }}</span>
	</footer>
</template>
