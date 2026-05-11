<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { PAL, MONO_STACK } from "../lib/palette";
import { themeTokens, isDark } from "../lib/theme";
import { PORTFOLIO } from "../lib/portfolio";
import RevealOnScroll from "../components/RevealOnScroll.vue";

const { t } = useI18n();
</script>

<template>
	<section
		:style="{
			padding: '80px 48px 60px',
			borderBottom: `1px solid ${themeTokens.border}`,
		}"
	>
		<div
			:style="{
				font: `500 12px/1 ${MONO_STACK}`,
				color: PAL.gold,
				letterSpacing: '1px',
				marginBottom: '20px',
			}"
		>
			$ whoami
		</div>
		<RevealOnScroll>
			<div
				:style="{
					font: '400 18px/1.2 Inter, sans-serif',
					color: themeTokens.fg,
					opacity: 0.75,
					marginBottom: '12px',
				}"
			>
				{{ t("hero.greeting") }}
			</div>
			<h1
				:style="{
					margin: 0,
					font: '700 clamp(40px, 7vw, 84px)/1.05 Inter, sans-serif',
					letterSpacing: '-1.5px',
					color: themeTokens.fg,
				}"
			>
				{{ PORTFOLIO.name }}<span :style="{ color: PAL.gold }">.</span>
			</h1>
		</RevealOnScroll>
		<RevealOnScroll :delay="100">
			<p
				:style="{
					margin: '20px 0 0',
					maxWidth: '640px',
					font: '400 20px/1.5 Inter, sans-serif',
					color: themeTokens.fg,
					opacity: 0.85,
				}"
			>
				{{ t("hero.role") }} {{ t("hero.location") }}
			</p>
		</RevealOnScroll>
		<RevealOnScroll :delay="200">
			<div
				:style="{
					marginTop: '32px',
					display: 'flex',
					gap: '12px',
					flexWrap: 'wrap',
				}"
			>
				<span
					v-for="tag in [
						{ label: t('hero.tag.openToWork'), color: PAL.gold },
						{ label: t('hero.tag.years'), color: PAL.amber },
						{ label: t('hero.tag.learning'), color: isDark ? PAL.cream : PAL.ink },
					]"
					:key="tag.label"
					:style="{
						display: 'inline-block',
						padding: '3px 8px',
						borderRadius: '3px',
						background: tag.color + '22',
						color: tag.color,
						font: `500 11px/1 ${MONO_STACK}`,
						letterSpacing: '0.5px',
					}"
					>{{ tag.label }}</span
				>
			</div>
		</RevealOnScroll>
	</section>
</template>
