<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { PORTFOLIO } from "../lib/portfolio";
import { getTechHome, type TechName } from "../lib/techRegistry";
import { setFilter, scrollToProjects } from "../lib/filters";
import RevealOnScroll from "../components/RevealOnScroll.vue";
import TerminalIcon from "../components/TerminalIcon.vue";
import TechIcon from "../components/TechIcon.vue";

const { t } = useI18n();

const filterByTech = (tech: TechName) => {
	setFilter([tech]);
	scrollToProjects();
};

// CSS-friendly token name for each tag's tailwind color triple
const tagClass = {
	daily: { dot: "bg-tag-daily", text: "text-tag-daily" },
	shipped: { dot: "bg-tag-shipped", text: "text-tag-shipped" },
	touched: { dot: "bg-tag-touched", text: "text-tag-touched" },
	learning: { dot: "bg-tag-learning", text: "text-tag-learning" },
} as const;
</script>

<template>
	<section class="border-b border-border px-12 py-16 @max-[440px]:px-4 @max-[820px]:px-6">
		<div class="mb-6 font-mono text-xs font-medium leading-none text-dim">
			<span class="text-gold">02</span> &nbsp;/&nbsp; stack.yaml
		</div>
		<RevealOnScroll>
			<h2 class="m-0 text-[36px] font-bold leading-snug text-fg">{{ t("stack.title") }}</h2>
		</RevealOnScroll>

		<div class="v2-stack-grid mt-8 grid grid-cols-2 gap-6 @max-[820px]:grid-cols-1">
			<RevealOnScroll v-for="(c, i) in PORTFOLIO.competencies" :key="c.labelKey" :delay="i * 80">
				<div class="rounded-md border border-border bg-panel p-6">
					<div class="mb-5 flex items-center gap-2.5">
						<TerminalIcon :name="c.icon" :size="16" stroke="rgb(199,167,99)" />
						<span class="font-mono text-xs font-medium uppercase leading-none tracking-widest text-gold">{{
							t(c.labelKey)
						}}</span>
					</div>
					<ul class="m-0 flex list-none flex-col gap-2.5 p-0">
						<li v-for="it in c.items" :key="it.name">
							<div
								role="button"
								tabindex="0"
								:aria-label="`filter projects by ${it.name}`"
								class="-mx-2 grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-3 rounded p-1.5 px-2 transition-colors duration-150 hover:bg-panel-hover-strong"
								@click="filterByTech(it.name)"
								@keydown.enter.prevent="filterByTech(it.name)"
								@keydown.space.prevent="filterByTech(it.name)"
							>
								<a
									v-if="getTechHome(it.name)"
									:href="getTechHome(it.name)"
									target="_blank"
									rel="noopener noreferrer"
									:aria-label="`${it.name} — official website (opens in a new tab)`"
									class="v2-tech-link col-span-2 inline-flex w-fit min-w-0 items-center gap-3 justify-self-start text-inherit no-underline"
									@click.stop
								>
									<TechIcon :name="it.name" :size="26" />
									<span class="v2-tech-name font-sans text-sm font-medium leading-tight text-fg">{{ it.name }}</span>
								</a>
								<template v-else>
									<TechIcon :name="it.name" :size="26" />
									<span class="font-sans text-sm font-medium leading-tight text-fg">{{ it.name }}</span>
								</template>
								<span
									class="inline-flex items-center gap-1.5 px-2 py-1 font-mono text-[10px] font-medium uppercase leading-none tracking-wider"
									:class="tagClass[it.tag].text"
								>
									<span class="h-[5px] w-[5px] rounded-full" :class="tagClass[it.tag].dot" />
									{{ t(`stack.tag.${it.tag}`) }}
								</span>
							</div>
						</li>
					</ul>
				</div>
			</RevealOnScroll>
		</div>
	</section>
</template>
