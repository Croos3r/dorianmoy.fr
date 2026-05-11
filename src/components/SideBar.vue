<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { PAL, MONO_STACK } from "../lib/palette";
import { themeTokens, isDark } from "../lib/theme";
import { PORTFOLIO } from "../lib/portfolio";
import TerminalIcon from "./TerminalIcon.vue";

export type FileEntry = {
	id: string;
	name: string;
	type: "markdown" | "yaml" | "dir" | "typescript";
};

defineProps<{
	files: FileEntry[];
	active: string;
	selIdx: number;
}>();

const emit = defineEmits<{
	navigate: [id: string, idx: number];
}>();

const { t } = useI18n();

const glyphFor = (type: FileEntry["type"]) => {
	switch (type) {
		case "markdown":
			return { ch: "M", col: "#519aba" };
		case "yaml":
			return { ch: "Y", col: "#cb171e" };
		case "dir":
			return { ch: "▸", col: PAL.gold };
		case "typescript":
			return { ch: "T", col: "#3178c6" };
	}
};

const resumeUrl = computed(() => t("resume.url"));
const resumeFilename = computed(() => t("resume.filename"));
</script>

<template>
	<aside
		class="v2-sidebar"
		:style="{
			borderRight: `1px solid ${themeTokens.border}`,
			padding: '10px 0',
			overflowY: 'auto',
			background: themeTokens.panel,
		}"
	>
		<div
			:style="{
				padding: '6px 12px 10px',
				font: `600 12px/1.4 ${MONO_STACK}`,
				color: PAL.gold,
				borderBottom: `1px solid ${themeTokens.border}`,
				display: 'flex',
				alignItems: 'center',
				gap: '8px',
			}"
		>
			<TerminalIcon name="folder" :size="13" :stroke="PAL.gold" :sw="1.75" />
			<span :style="{ color: PAL.gold }">~/portfolio</span>
		</div>

		<div :style="{ padding: '6px 0' }">
			<button
				v-for="(f, i) in files"
				:key="f.id"
				class="v2-tree-row"
				:style="{
					all: 'unset',
					cursor: 'pointer',
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
					padding: '2px 12px',
					width: '100%',
					boxSizing: 'border-box',
					font: `${active === f.id ? 700 : 500} 13px/1.4 ${MONO_STACK}`,
					color: active === f.id || selIdx === i ? themeTokens.fg : themeTokens.dim,
					background: selIdx === i ? (isDark ? 'rgba(199,167,99,0.10)' : 'rgba(199,167,99,0.16)') : 'transparent',
					position: 'relative',
				}"
				@click="emit('navigate', f.id, i)"
			>
				<span
					aria-hidden="true"
					:style="{
						position: 'absolute',
						left: 0,
						top: 0,
						bottom: 0,
						width: '2px',
						background: selIdx === i ? PAL.gold : 'transparent',
					}"
				/>
				<span
					aria-hidden="true"
					:style="{
						position: 'relative',
						width: '14px',
						minHeight: '22px',
						flexShrink: 0,
						alignSelf: 'stretch',
					}"
				>
					<span
						:style="{
							position: 'absolute',
							left: '5px',
							top: 0,
							bottom: i === files.length - 1 ? '50%' : 0,
							borderLeft: `1px solid ${themeTokens.dim}`,
							opacity: 0.5,
						}"
					/>
					<span
						:style="{
							position: 'absolute',
							left: '5px',
							top: '50%',
							width: '7px',
							borderTop: `1px solid ${themeTokens.dim}`,
							opacity: 0.5,
						}"
					/>
				</span>
				<span
					:style="{
						color: glyphFor(f.type).col,
						width: '14px',
						textAlign: 'center',
						fontWeight: 700,
						fontSize: '12px',
					}"
					>{{ glyphFor(f.type).ch }}</span
				>
				<span :style="{ flex: 1 }">{{ f.name }}</span>
			</button>
		</div>

		<div
			:style="{
				marginTop: '14px',
				padding: '12px 12px 4px',
				font: `600 10px/1 ${MONO_STACK}`,
				color: themeTokens.dim,
				letterSpacing: '1px',
				textTransform: 'uppercase',
				borderTop: `1px solid ${themeTokens.border}`,
			}"
		>
			<span :style="{ color: PAL.gold, marginRight: '6px' }">:reg</span>
			{{ t("sidebar.marks") }}
		</div>
		<a
			v-for="(s, i) in PORTFOLIO.socials"
			:key="s.label"
			:href="s.href"
			target="_blank"
			rel="noopener noreferrer"
			:style="{
				display: 'flex',
				alignItems: 'center',
				gap: '8px',
				padding: '3px 12px',
				font: `500 13px/1.5 ${MONO_STACK}`,
				color: themeTokens.dim,
				textDecoration: 'none',
			}"
			@mouseenter="(e) => ((e.currentTarget as HTMLElement).style.color = PAL.gold)"
			@mouseleave="(e) => ((e.currentTarget as HTMLElement).style.color = themeTokens.dim)"
		>
			<span :style="{ color: PAL.gold, opacity: 0.7, width: '14px' }">"{{ ["a", "b", "c", "d", "e"][i] || "*" }}</span>
			<span :style="{ flex: 1 }">{{ s.label.toLowerCase() }}</span>
			<TerminalIcon name="arrowUR" :size="11" />
		</a>

		<a
			:href="resumeUrl"
			:download="resumeFilename"
			:style="{
				display: 'flex',
				alignItems: 'center',
				gap: '8px',
				padding: '3px 12px',
				font: `500 13px/1.5 ${MONO_STACK}`,
				color: PAL.gold,
				textDecoration: 'none',
			}"
		>
			<span :style="{ color: PAL.gold, opacity: 0.7, width: '14px' }">"r</span>
			<span :style="{ flex: 1 }">{{ t("resume.label") }}</span>
			<TerminalIcon name="download" :size="11" :stroke="PAL.gold" />
		</a>

		<div
			:style="{
				margin: '18px 12px 4px',
				paddingTop: '12px',
				borderTop: `1px solid ${themeTokens.border}`,
				font: `500 10px/1.7 ${MONO_STACK}`,
				color: themeTokens.dim,
				opacity: 0.75,
			}"
		>
			<div :style="{ display: 'flex', gap: '6px' }">
				<span :style="{ color: PAL.gold, minWidth: '38px' }">j&nbsp;↓&nbsp;k&nbsp;↑</span>
				<span>{{ t("sidebar.move") }}</span>
			</div>
			<div :style="{ display: 'flex', gap: '6px' }">
				<span :style="{ color: PAL.gold, minWidth: '38px' }">g&nbsp;⇞&nbsp;G&nbsp;⇟</span>
				<span>{{ t("sidebar.topbot") }}</span>
			</div>
			<div :style="{ display: 'flex', gap: '6px' }">
				<span :style="{ color: PAL.gold, minWidth: '38px' }">↵</span>
				<span>{{ t("sidebar.open") }}</span>
			</div>
			<div :style="{ display: 'flex', gap: '6px' }">
				<span :style="{ color: PAL.gold, minWidth: '38px' }">"a</span>
				<span>{{ t("sidebar.mark") }}</span>
			</div>
			<div :style="{ display: 'flex', gap: '6px' }">
				<span :style="{ color: PAL.gold, minWidth: '38px' }">"r</span>
				<span>{{ t("resume.label") }}</span>
			</div>
		</div>
	</aside>
</template>
