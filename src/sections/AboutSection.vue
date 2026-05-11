<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { PAL, MONO_STACK } from "../lib/palette";
import { themeTokens } from "../lib/theme";
import { PORTFOLIO } from "../lib/portfolio";
import RevealOnScroll from "../components/RevealOnScroll.vue";

const { t } = useI18n();
</script>

<template>
	<section
		:style="{
			padding: '64px 48px',
			borderBottom: `1px solid ${themeTokens.border}`,
		}"
	>
		<div
			class="v2-about-grid"
			:style="{
				marginBottom: '32px',
				display: 'grid',
				gridTemplateColumns: '1fr 300px',
				gap: '48px',
				alignItems: 'center',
			}"
		>
			<div>
				<div
					:style="{
						font: `500 12px/1 ${MONO_STACK}`,
						color: themeTokens.dim,
						marginBottom: '24px',
					}"
				>
					<span :style="{ color: PAL.gold }">01</span> &nbsp;/&nbsp; about.md
				</div>
				<RevealOnScroll>
					<h2
						:style="{
							margin: 0,
							font: '700 36px/1.3 Inter, sans-serif',
							color: themeTokens.fg,
						}"
					>
						{{ t("about.title") }}
					</h2>
				</RevealOnScroll>
				<div :style="{ marginTop: '32px' }">
					<RevealOnScroll
						v-for="(p, i) in [t('about.p1'), t('about.p2'), t('about.p3'), t('about.p4')]"
						:key="i"
						:delay="i * 80"
					>
						<p
							:style="{
								margin: i ? '16px 0 0' : 0,
								font: '400 18px/1.6 Inter, sans-serif',
								color: themeTokens.fg,
								opacity: 0.9,
							}"
							v-html="p"
						/>
					</RevealOnScroll>
				</div>
			</div>
			<RevealOnScroll :delay="200">
				<div
					class="v2-portrait"
					:style="{
						aspectRatio: '4 / 5',
						width: '100%',
						border: `1px solid ${themeTokens.border}`,
						background: themeTokens.panel,
						borderRadius: '6px',
						overflow: 'hidden',
						position: 'relative',
					}"
				>
					<img
						src="/portrait.webp"
						:alt="PORTFOLIO.name"
						:style="{
							display: 'block',
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							objectPosition: 'center',
						}"
					/>
					<div
						:style="{
							position: 'absolute',
							left: '12px',
							top: '10px',
							font: `500 11px/1 ${MONO_STACK}`,
							color: PAL.gold,
							letterSpacing: '0.5px',
							background: 'rgba(0,0,0,0.55)',
							padding: '4px 8px',
							borderRadius: '3px',
							backdropFilter: 'blur(4px)',
						}"
					>
						// portrait.webp
					</div>
				</div>
			</RevealOnScroll>
		</div>
	</section>
</template>
