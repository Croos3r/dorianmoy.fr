<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { PORTFOLIO } from "../lib/portfolio";
import RevealOnScroll from "../components/RevealOnScroll.vue";

const { t } = useI18n();
</script>

<template>
	<section class="border-b border-border px-12 pb-[60px] pt-20 @max-[440px]:px-4 @max-[820px]:px-6">
		<div class="mb-5 font-mono text-xs font-medium leading-none tracking-widest text-gold">$ whoami</div>
		<RevealOnScroll>
			<div class="mb-3 text-lg font-normal leading-tight text-fg/75">{{ t("hero.greeting") }}</div>
			<h1
				class="m-0 font-sans font-bold leading-[1.05] tracking-[-1.5px] text-fg"
				style="font-size: clamp(40px, 7vw, 84px)"
			>
				{{ PORTFOLIO.name }}<span class="text-gold">.</span>
			</h1>
		</RevealOnScroll>
		<RevealOnScroll :delay="100">
			<p class="m-0 mt-5 max-w-[640px] text-xl font-normal leading-relaxed text-fg/85">
				{{ t("hero.role") }} {{ t("hero.location") }}
			</p>
		</RevealOnScroll>
		<RevealOnScroll :delay="200">
			<div class="mt-8 flex flex-wrap gap-3">
				<span class="font-mono text-[11px] font-medium leading-none tracking-wider text-gold">{{
					t("hero.tag.openToWork")
				}}</span>
				<span class="font-mono text-[11px] font-medium leading-none tracking-wider text-amber">{{
					t("hero.tag.years")
				}}</span>
				<span class="font-mono text-[11px] font-medium leading-none tracking-wider text-ink dark:text-cream">{{
					t("hero.tag.learning")
				}}</span>
			</div>
		</RevealOnScroll>
	</section>
</template>
