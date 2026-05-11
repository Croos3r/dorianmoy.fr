<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { PAL, MONO_STACK } from "../lib/palette";
import { themeTokens } from "../lib/theme";
import { PORTFOLIO } from "../lib/portfolio";
import RevealOnScroll from "../components/RevealOnScroll.vue";
import ContactForm from "../components/ContactForm.vue";

const { t } = useI18n();
</script>

<template>
	<section :style="{ padding: '64px 48px' }">
		<div
			:style="{
				font: `500 12px/1 ${MONO_STACK}`,
				color: themeTokens.dim,
				marginBottom: '24px',
			}"
		>
			<span :style="{ color: PAL.gold }">04</span> &nbsp;/&nbsp; contact.ts
		</div>
		<RevealOnScroll>
			<h2
				:style="{
					margin: 0,
					font: '700 36px/1.3 Inter, sans-serif',
					color: themeTokens.fg,
				}"
			>
				{{ t("contact.title") }}
			</h2>
		</RevealOnScroll>
		<RevealOnScroll :delay="60">
			<p
				:style="{
					margin: '12px 0 0',
					maxWidth: '520px',
					font: '400 15px/1.55 Inter, sans-serif',
					color: themeTokens.dim,
				}"
			>
				{{ t("contact.lede") }}
			</p>
		</RevealOnScroll>

		<RevealOnScroll :delay="120">
			<ContactForm />
		</RevealOnScroll>

		<RevealOnScroll :delay="200">
			<div
				:style="{
					marginTop: '32px',
					display: 'flex',
					alignItems: 'center',
					gap: '12px',
					font: `500 12px/1.5 ${MONO_STACK}`,
					color: themeTokens.dim,
				}"
			>
				<span :style="{ color: PAL.gold }">$</span>
				<span>{{ t("contact.orEmail") }}</span>
				<a
					:href="`mailto:${PORTFOLIO.email}`"
					:style="{
						color: PAL.amber,
						textDecoration: 'underline',
						textDecorationColor: PAL.amber + '66',
						textUnderlineOffset: '3px',
					}"
					>{{ PORTFOLIO.email }}</a
				>
			</div>
		</RevealOnScroll>
	</section>
</template>
