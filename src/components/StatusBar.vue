<script lang="ts" setup>
import { PAL, MONO_STACK, TAG_COLORS } from "../lib/palette";
import { themeTokens } from "../lib/theme";
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
		class="v2-statusbar"
		:style="{
			display: 'flex',
			alignItems: 'stretch',
			padding: 0,
			borderTop: `1px solid ${themeTokens.border}`,
			background: themeTokens.panel,
			font: `600 11px/1 ${MONO_STACK}`,
			color: themeTokens.dim,
		}"
	>
		<span
			class="v2-sb-mode"
			:style="{
				padding: '0 14px',
				display: 'inline-flex',
				alignItems: 'center',
				background: mode === 'INSERT' ? TAG_COLORS.daily : PAL.gold,
				color: mode === 'INSERT' ? '#fff' : PAL.ink,
				letterSpacing: '1px',
				transition: 'background .15s, color .15s',
			}"
			>{{ mode }}</span
		>
		<span
			class="v2-sb-branch"
			:style="{
				padding: '0 12px',
				display: 'inline-flex',
				alignItems: 'center',
				gap: '6px',
				borderRight: `1px solid ${themeTokens.border}`,
			}"
		>
			<TerminalIcon name="branch" :size="11" stroke="currentColor" />main
		</span>
		<span
			class="v2-sb-file"
			:style="{
				padding: '0 12px',
				display: 'inline-flex',
				alignItems: 'center',
				color: themeTokens.fg,
				fontWeight: 500,
			}"
			>{{ fileName }}</span
		>
		<span class="v2-sb-spacer" :style="{ flex: 1 }" />
		<span
			class="v2-sb-type"
			:style="{
				padding: '0 12px',
				display: 'inline-flex',
				alignItems: 'center',
				borderLeft: `1px solid ${themeTokens.border}`,
			}"
			>{{ fileType }}</span
		>
		<span
			class="v2-sb-enc"
			:style="{
				padding: '0 12px',
				display: 'inline-flex',
				alignItems: 'center',
				borderLeft: `1px solid ${themeTokens.border}`,
			}"
			>utf-8</span
		>
		<span
			class="v2-sb-eol"
			:style="{
				padding: '0 12px',
				display: 'inline-flex',
				alignItems: 'center',
				borderLeft: `1px solid ${themeTokens.border}`,
			}"
			>LF</span
		>
		<span
			class="v2-sb-pos"
			:style="{
				padding: '0 14px',
				display: 'inline-flex',
				alignItems: 'center',
				background: PAL.gold,
				color: PAL.ink,
				letterSpacing: '0.5px',
			}"
			>{{ activeIdx + 1 }}/{{ total }}</span
		>
	</footer>
</template>
