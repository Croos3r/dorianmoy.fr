<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { PORTFOLIO } from "../lib/portfolio";
import RevealOnScroll from "../components/RevealOnScroll.vue";

const { t } = useI18n();
</script>

<template>
	<section class="@max-[820px]:px-6 @max-[440px]:px-4 border-b border-border px-12 py-16">
		<!--
		  Default: text on left, portrait at fixed 300px on right.
		  ≤560: stack — portrait below text, capped width.
		-->
		<div class="v2-about-grid @max-[560px]:grid-cols-1 mb-8 grid grid-cols-[1fr_300px] items-center gap-12">
			<div>
				<div class="mb-6 font-mono text-xs font-medium leading-none text-dim">
					<span class="text-gold">01</span> &nbsp;/&nbsp; about.md
				</div>
				<RevealOnScroll>
					<h2 class="m-0 text-[36px] font-bold leading-snug text-fg">{{ t("about.title") }}</h2>
				</RevealOnScroll>
				<div class="mt-8">
					<RevealOnScroll
						v-for="(p, i) in [t('about.p1'), t('about.p2'), t('about.p3'), t('about.p4')]"
						:key="i"
						:delay="i * 80"
					>
						<!-- eslint-disable vue/no-v-html -->
						<p class="text-fg/90 text-lg font-normal leading-relaxed" :class="i ? 'mt-4' : 'mt-0'" v-html="p" />
						<!-- eslint-enable vue/no-v-html -->
					</RevealOnScroll>
				</div>
			</div>
			<RevealOnScroll :delay="200">
				<div
					class="v2-portrait @max-[560px]:max-w-[300px] @max-[560px]:justify-self-start relative aspect-[4/5] w-full overflow-hidden rounded-md border border-border bg-panel"
				>
					<img src="/portrait.webp" :alt="PORTFOLIO.name" class="block h-full w-full object-cover object-center" />
					<div
						class="absolute left-3 top-2.5 rounded-[3px] bg-black/55 px-2 py-1 font-mono text-[11px] font-medium leading-none tracking-wider text-gold backdrop-blur-[4px]"
					>
						// portrait.webp
					</div>
				</div>
			</RevealOnScroll>
		</div>
	</section>
</template>
