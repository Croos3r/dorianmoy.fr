<script lang="ts" setup>
import { onBeforeUnmount, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { PAL, MONO_STACK } from "../lib/palette";
import { themeTokens, isDark } from "../lib/theme";
import { getTechHome } from "../lib/techRegistry";
import type { Project } from "../lib/portfolio";
import TerminalIcon from "./TerminalIcon.vue";
import TechIcon from "./TechIcon.vue";

const props = defineProps<{ project: Project | null }>();
const emit = defineEmits<{ close: [] }>();

const { t } = useI18n();

const onKey = (e: KeyboardEvent) => {
	if (e.key === "Escape") {
		emit("close");
		return;
	}
	if (e.key === "q" && !e.metaKey && !e.ctrlKey && !e.altKey) {
		const t = e.target as HTMLElement | null;
		if (t?.tagName === "INPUT" || t?.tagName === "TEXTAREA" || t?.isContentEditable) return;
		e.preventDefault();
		emit("close");
	}
};

onMounted(() => {
	window.addEventListener("keydown", onKey);
});
onBeforeUnmount(() => {
	window.removeEventListener("keydown", onKey);
	document.body.style.overflow = "";
});

watch(
	() => props.project,
	(p) => {
		document.body.style.overflow = p ? "hidden" : "";
	},
	{ immediate: true },
);
</script>

<template>
	<div
		v-if="project"
		:style="{
			position: 'fixed',
			inset: 0,
			zIndex: 1000,
			background: 'rgba(0,0,0,0.55)',
			backdropFilter: 'blur(6px)',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'flex-start',
			padding: 'clamp(12px, 4vh, 40px)',
			overflowY: 'auto',
			animation: 'pm-fade .25s ease',
		}"
		@click="emit('close')"
	>
		<div
			class="v2-modal"
			:style="{
				background: themeTokens.bg,
				color: themeTokens.fg,
				width: 'min(900px, 100%)',
				borderRadius: '8px',
				overflow: 'hidden',
				fontFamily: 'Inter, system-ui, sans-serif',
				animation: 'pm-slide .35s cubic-bezier(.2,.7,.2,1)',
				boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
				border: `1px solid ${themeTokens.border}`,
			}"
			@click.stop
		>
			<div
				class="v2-modal-header"
				:style="{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '20px 28px',
					borderBottom: `1px solid ${themeTokens.border}`,
					font: `500 12px/1 ${MONO_STACK}`,
					color: themeTokens.dim,
					letterSpacing: '1px',
					textTransform: 'uppercase',
				}"
			>
				<span>./projects/{{ project.index }} · {{ project.year }}</span>
				<button
					:style="{
						all: 'unset',
						cursor: 'pointer',
						width: '32px',
						height: '32px',
						borderRadius: '50%',
						display: 'inline-flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: themeTokens.fg,
						transition: 'background .2s',
					}"
					aria-label="close"
					@mouseenter="(e) => ((e.currentTarget as HTMLElement).style.background = themeTokens.border)"
					@mouseleave="(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')"
					@click="emit('close')"
				>
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M6 6 L18 18" />
						<path d="M18 6 L6 18" />
					</svg>
				</button>
			</div>

			<div
				v-if="project.image"
				:style="{
					position: 'relative',
					background: isDark ? PAL.cream : PAL.ink,
					color: isDark ? PAL.ink : PAL.cream,
					overflow: 'hidden',
					aspectRatio: '16 / 9',
				}"
			>
				<img
					:src="project.image"
					:alt="t(project.titleKey)"
					:style="{
						display: 'block',
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'top center',
					}"
				/>
				<div
					:style="{
						position: 'absolute',
						top: '18px',
						left: '20px',
						font: `500 11px/1 ${MONO_STACK}`,
						letterSpacing: '0.8px',
						textTransform: 'uppercase',
						color: '#fff',
						background: 'rgba(0,0,0,0.55)',
						padding: '6px 10px',
						borderRadius: '3px',
						backdropFilter: 'blur(4px)',
					}"
				>
					./{{ project.id }}
				</div>
			</div>

			<div
				class="v2-modal-body"
				:style="{
					padding: project.image ? '40px 48px 48px' : '36px 48px 48px',
				}"
			>
				<div
					:style="{
						font: `500 12px/1 ${MONO_STACK}`,
						color: PAL.gold,
						letterSpacing: '2px',
						textTransform: 'uppercase',
						marginBottom: '16px',
					}"
				>
					{{ t(project.taglineKey) }}
				</div>
				<h2
					class="v2-modal-title"
					:style="{
						margin: 0,
						font: '700 clamp(28px, 5vw, 52px)/1.1 Inter, sans-serif',
						letterSpacing: '-1px',
						color: themeTokens.fg,
						display: 'flex',
						alignItems: 'baseline',
						gap: '14px',
						flexWrap: 'wrap',
					}"
				>
					<span>{{ t(project.titleKey) }}</span>
					<span
						v-if="t(project.subtitleKey)"
						:style="{
							font: '500 clamp(14px, 1.6vw, 18px)/1.2 Inter, sans-serif',
							color: themeTokens.dim,
							letterSpacing: 0,
							opacity: 0.8,
						}"
						>{{ t(project.subtitleKey) }}</span
					>
				</h2>

				<div
					:style="{
						display: 'flex',
						gap: '8px',
						flexWrap: 'wrap',
						marginTop: '28px',
					}"
				>
					<template v-for="s in project.stack" :key="s">
						<a
							v-if="getTechHome(s)"
							:href="getTechHome(s)"
							target="_blank"
							rel="noopener noreferrer"
							:style="{
								display: 'inline-flex',
								alignItems: 'center',
								gap: '8px',
								padding: '6px 10px',
								border: `1px solid ${themeTokens.border}`,
								borderRadius: '3px',
								font: `500 12px/1 ${MONO_STACK}`,
								letterSpacing: '0.3px',
								textDecoration: 'none',
								transition: 'border-color .15s',
							}"
							@mouseenter="(e) => ((e.currentTarget as HTMLElement).style.borderColor = PAL.gold)"
							@mouseleave="(e) => ((e.currentTarget as HTMLElement).style.borderColor = themeTokens.border)"
						>
							<TechIcon :name="s" :size="18" />
							<span
								:style="{
									color: PAL.gold,
									textDecoration: 'underline',
									textUnderlineOffset: '3px',
									textDecorationThickness: '1px',
								}"
								>{{ s.toLowerCase() }}</span
							>
						</a>
						<span
							v-else
							:style="{
								display: 'inline-flex',
								alignItems: 'center',
								gap: '8px',
								padding: '6px 10px',
								border: `1px solid ${themeTokens.border}`,
								borderRadius: '3px',
								font: `500 12px/1 ${MONO_STACK}`,
								letterSpacing: '0.3px',
							}"
						>
							<TechIcon :name="s" :size="18" />
							<span :style="{ color: PAL.gold }">{{ s.toLowerCase() }}</span>
						</span>
					</template>
				</div>

				<p
					:style="{
						margin: '32px 0 0',
						maxWidth: '640px',
						font: '400 17px/1.65 Inter, sans-serif',
						color: themeTokens.fg,
						opacity: 0.92,
					}"
				>
					{{ t(project.bodyKey) }}
				</p>

				<div
					v-if="project.url"
					:style="{
						marginTop: '40px',
						display: 'flex',
						gap: '16px',
						flexWrap: 'wrap',
					}"
				>
					<a
						:href="project.url"
						target="_blank"
						rel="noopener noreferrer"
						:style="{
							display: 'inline-flex',
							alignItems: 'center',
							gap: '10px',
							padding: '14px 24px',
							background: PAL.gold,
							color: PAL.ink,
							font: '600 14px/1 Inter, sans-serif',
							borderRadius: '4px',
							textDecoration: 'none',
						}"
					>
						{{ t("modal.visit") }} <TerminalIcon name="arrowUR" :size="14" />
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
@keyframes pm-fade {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
@keyframes pm-slide {
	from {
		transform: translateY(20px);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
}
</style>
