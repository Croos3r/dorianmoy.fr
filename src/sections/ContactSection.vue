<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { PORTFOLIO } from "../lib/portfolio";
import RevealOnScroll from "../components/RevealOnScroll.vue";
import ContactForm from "../components/ContactForm.vue";

const { t } = useI18n();
</script>

<template>
	<section class="px-12 py-16 @max-[440px]:px-4 @max-[820px]:px-6">
		<div class="mb-6 font-mono text-xs font-medium leading-none text-dim">
			<span class="text-gold">04</span> &nbsp;/&nbsp; contact.ts
		</div>
		<RevealOnScroll>
			<h2 class="m-0 text-[36px] font-bold leading-snug text-fg">{{ t("contact.title") }}</h2>
		</RevealOnScroll>
		<RevealOnScroll :delay="60">
			<p class="mt-3 max-w-[520px] text-[15px] font-normal leading-[1.55] text-dim">
				{{ t("contact.lede") }}
			</p>
		</RevealOnScroll>

		<RevealOnScroll :delay="120">
			<ContactForm />
		</RevealOnScroll>

		<RevealOnScroll :delay="200">
			<div class="mt-8 flex items-center gap-3 font-mono text-xs font-medium leading-normal text-dim">
				<span class="text-gold">$</span>
				<span>{{ t("contact.orEmail") }}</span>
				<a
					:href="`mailto:${PORTFOLIO.email}`"
					class="text-amber underline decoration-amber/40 underline-offset-[3px]"
					>{{ PORTFOLIO.email }}</a
				>
			</div>
		</RevealOnScroll>
	</section>
</template>
