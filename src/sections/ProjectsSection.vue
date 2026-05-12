<script lang="ts" setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { PORTFOLIO, type Project } from "../lib/portfolio";
import { getTechHome } from "../lib/techRegistry";
import { selectedTechs } from "../lib/filters";
import RevealOnScroll from "../components/RevealOnScroll.vue";
import TechIcon from "../components/TechIcon.vue";

const { t } = useI18n();

const emit = defineEmits<{ "open-project": [project: Project] }>();
const open = (p: Project) => emit("open-project", p);

const INITIAL_COUNT = 5;
const expanded = ref(false);

const allTechs = computed(() => {
	const set = new Set<string>();
	for (const p of PORTFOLIO.projects) for (const s of p.stack) set.add(s);
	return [...set].sort((a, b) => a.localeCompare(b));
});

const query = ref("");
const open_ = ref(false);

const isSelected = (tech: string) => selectedTechs.value.includes(tech);

const suggestions = computed(() => {
	const q = query.value.trim().toLowerCase();
	return allTechs.value.filter((tech) => !isSelected(tech) && (!q || tech.toLowerCase().includes(q)));
});

const filteredProjects = computed(() =>
	selectedTechs.value.length
		? PORTFOLIO.projects.filter((p) => selectedTechs.value.every((t) => p.stack.includes(t)))
		: PORTFOLIO.projects,
);

const visibleProjects = computed(() => {
	if (selectedTechs.value.length) return filteredProjects.value;
	return expanded.value ? PORTFOLIO.projects : PORTFOLIO.projects.slice(0, INITIAL_COUNT);
});
const hasMore = computed(() => selectedTechs.value.length === 0 && PORTFOLIO.projects.length > INITIAL_COUNT);

const addTech = (tech: string) => {
	if (!isSelected(tech)) selectedTechs.value = [...selectedTechs.value, tech];
	query.value = "";
};
const removeTech = (tech: string) => {
	selectedTechs.value = selectedTechs.value.filter((t) => t !== tech);
};
const clearAll = () => {
	selectedTechs.value = [];
	query.value = "";
};

const onBlur = () => setTimeout(() => (open_.value = false), 120);
</script>

<template>
	<section class="@max-[820px]:px-6 @max-[440px]:px-4 border-b border-border px-12 py-16">
		<div class="mb-6 font-mono text-xs font-medium leading-none text-dim">
			<span class="text-gold">03</span> &nbsp;/&nbsp; projects/
		</div>
		<RevealOnScroll>
			<h2 class="m-0 text-[36px] font-bold leading-snug text-fg">{{ t("projects.title") }}</h2>
		</RevealOnScroll>

		<!-- ── Multi-tech filter ────────────────────────────────────── -->
		<div class="relative mt-6 max-w-[640px]">
			<div
				class="flex flex-wrap items-center gap-1.5 rounded border bg-panel px-2.5 py-2 transition-[border-color,box-shadow] duration-150"
				:class="open_ ? 'border-gold shadow-[0_0_0_3px_rgba(199,167,99,0.12)]' : 'border-border'"
				@click="
					(e) => {
						open_ = true;
						const input = (e.currentTarget as HTMLElement).querySelector('input');
						input?.focus();
					}
				"
			>
				<span class="self-center font-mono text-[11px] font-medium uppercase leading-none tracking-widest text-gold">
					:filter
				</span>
				<span
					v-for="tech in selectedTechs"
					:key="tech"
					class="inline-flex items-center gap-1.5 rounded-[3px] border border-gold/40 bg-gold/[0.13] py-[3px] pl-2 pr-1 font-mono text-[11px] font-medium leading-none text-gold"
					@click.stop
				>
					<TechIcon :name="tech" :size="14" />
					{{ tech }}
					<button
						type="button"
						class="inline-flex h-4 w-4 cursor-pointer items-center justify-center rounded-[2px] bg-transparent text-xs text-gold hover:bg-gold/20"
						:aria-label="`remove ${tech}`"
						@click.stop="removeTech(tech)"
					>
						✕
					</button>
				</span>
				<input
					v-model="query"
					type="text"
					autocomplete="off"
					:placeholder="selectedTechs.length ? '' : t('projects.filter.placeholder')"
					class="block min-w-[120px] flex-1 border-0 bg-transparent px-0.5 py-1 font-mono text-xs font-medium leading-none text-fg outline-none placeholder:text-dim"
					@focus="open_ = true"
					@blur="onBlur"
					@keydown.enter.prevent="suggestions.length > 0 && addTech(suggestions[0])"
					@keydown.backspace="
						query === '' && selectedTechs.length && removeTech(selectedTechs[selectedTechs.length - 1])
					"
				/>
				<button
					v-if="selectedTechs.length"
					type="button"
					class="cursor-pointer bg-transparent px-2 py-1 font-mono text-[11px] font-medium uppercase leading-none tracking-wide text-dim transition-colors duration-150 hover:text-gold"
					@click.stop="clearAll"
				>
					{{ t("projects.filter.clear") }}
				</button>
			</div>

			<!-- ── Suggestions popover ─────────────────────────────── -->
			<div
				v-if="open_ && suggestions.length > 0"
				class="absolute inset-x-0 top-[calc(100%+4px)] z-10 max-h-[240px] overflow-y-auto rounded border border-border bg-bg p-1 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
			>
				<button
					v-for="tech in suggestions"
					:key="tech"
					type="button"
					class="flex w-full cursor-pointer items-center gap-2 rounded-[3px] px-2.5 py-1.5 font-mono text-xs font-medium leading-none text-fg transition-colors duration-150 hover:bg-panel-hover"
					@mousedown.prevent="addTech(tech)"
				>
					<TechIcon :name="tech" :size="16" />
					{{ tech }}
				</button>
			</div>
		</div>

		<div
			v-if="visibleProjects.length === 0"
			class="mt-6 rounded-md border border-dashed border-border px-7 py-8 text-center font-mono text-[13px] font-medium leading-normal text-dim"
		>
			{{ t("projects.filter.empty", { tech: selectedTechs.join(" + ") }) }}
		</div>

		<div v-else class="mt-6 flex flex-col gap-px overflow-hidden rounded-md border border-border">
			<RevealOnScroll v-for="(p, i) in visibleProjects" :key="p.id" :delay="i * 60">
				<div
					class="v2-proj-row @max-[640px]:grid-cols-[1fr_auto] @max-[440px]:grid-cols-1 group grid w-full cursor-pointer grid-cols-[1fr_auto_auto] items-center gap-6 bg-panel py-6 pl-7 pr-9 outline-none transition-all duration-200 hover:bg-panel-hover-strong hover:pl-9 hover:pr-7"
					:class="i < visibleProjects.length - 1 ? 'border-b border-border' : ''"
					role="button"
					tabindex="0"
					@click="open(p)"
					@keydown.enter.prevent="open(p)"
					@keydown.space.prevent="open(p)"
				>
					<span class="min-w-0">
						<div
							class="v2-proj-title @max-[640px]:break-words @max-[640px]:text-[17px] @max-[640px]:leading-snug mb-1 flex flex-wrap items-baseline gap-2.5 text-[22px] font-semibold leading-snug text-fg"
						>
							<span>{{ t(p.titleKey) }}</span>
							<span v-if="t(p.subtitleKey)" class="text-[13px] font-medium leading-snug text-fg/40">{{
								t(p.subtitleKey)
							}}</span>
						</div>
						<div
							class="v2-proj-tagline @max-[640px]:line-clamp-2 min-w-0 text-[15px] font-normal leading-snug text-dim"
						>
							{{ t(p.taglineKey) }}
						</div>
					</span>
					<span
						class="v2-proj-stack @max-[440px]:col-start-1 @max-[440px]:justify-self-start flex items-center gap-1.5"
					>
						<template v-for="s in p.stack.slice(0, 4)" :key="s">
							<a
								v-if="getTechHome(s)"
								:href="getTechHome(s)"
								target="_blank"
								rel="noopener noreferrer"
								:title="s"
								:aria-label="s"
								class="inline-flex no-underline"
								@click.stop
							>
								<TechIcon :name="s" :size="22" />
							</a>
							<TechIcon v-else :name="s" :size="22" />
						</template>
						<span v-if="p.stack.length > 4" class="ml-0.5 font-mono text-[11px] font-medium leading-none text-dim"
							>+{{ p.stack.length - 4 }}</span
						>
					</span>
					<span class="v2-proj-year @max-[640px]:hidden font-mono text-[13px] font-medium leading-none text-dim">{{
						p.year
					}}</span>
				</div>
			</RevealOnScroll>
		</div>

		<div v-if="hasMore" class="mt-6 flex justify-center">
			<button
				type="button"
				class="inline-flex cursor-pointer items-center gap-2.5 rounded border border-border bg-panel px-[18px] py-2.5 font-mono text-xs font-medium uppercase leading-none tracking-wider text-gold transition-[background-color,border-color] duration-150 hover:border-gold hover:bg-panel-hover-strong"
				@click="expanded = !expanded"
			>
				{{ expanded ? t("projects.seeLess") : t("projects.seeMore", { n: PORTFOLIO.projects.length - INITIAL_COUNT }) }}
				<span class="inline-block transition-transform duration-200" :class="expanded ? 'rotate-180' : ''">▾</span>
			</button>
		</div>
	</section>
</template>
