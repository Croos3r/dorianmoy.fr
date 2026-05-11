<script lang="ts" setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { PAL, MONO_STACK } from "../lib/palette";
import { themeTokens, isDark } from "../lib/theme";
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

// Sorted, de-duped list of every tech that appears across the projects'
// stacks. Drives the filter chip row.
const allTechs = computed(() => {
	const set = new Set<string>();
	for (const p of PORTFOLIO.projects) for (const s of p.stack) set.add(s);
	return [...set].sort((a, b) => a.localeCompare(b));
});

// Multi-select filter: a project must include EVERY selected tech. The ref
// is shared via lib/filters so other sections can pre-fill it (e.g. clicking
// a competency in the stack section).
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

// Close the suggestion popover when focus leaves the field. Defer so a click
// on a suggestion still registers.
const onBlur = () => setTimeout(() => (open_.value = false), 120);
</script>

<template>
	<section
		:style="{
			padding: '64px 48px',
			borderBottom: `1px solid ${themeTokens.border}`,
		}"
	>
		<div
			:style="{
				font: `500 12px/1 ${MONO_STACK}`,
				color: themeTokens.dim,
				marginBottom: '24px',
			}"
		>
			<span :style="{ color: PAL.gold }">03</span> &nbsp;/&nbsp; projects/
		</div>
		<RevealOnScroll>
			<h2
				:style="{
					margin: 0,
					font: '700 36px/1.3 Inter, sans-serif',
					color: themeTokens.fg,
				}"
			>
				{{ t("projects.title") }}
			</h2>
		</RevealOnScroll>
		<!-- ── Multi-tech filter ────────────────────────────────────── -->
		<div
			:style="{
				marginTop: '24px',
				position: 'relative',
				maxWidth: '640px',
			}"
		>
			<div
				:style="{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'center',
					gap: '6px',
					padding: '8px 10px',
					border: `1px solid ${open_ ? PAL.gold : themeTokens.border}`,
					borderRadius: '4px',
					background: themeTokens.panel,
					transition: 'border-color .15s, box-shadow .15s',
					boxShadow: open_ ? `0 0 0 3px ${PAL.gold}1f` : 'none',
				}"
				@click="
					(e) => {
						open_ = true;
						const input = (e.currentTarget as HTMLElement).querySelector('input');
						input?.focus();
					}
				"
			>
				<span
					:style="{
						font: `500 11px/1 ${MONO_STACK}`,
						color: PAL.gold,
						letterSpacing: '1px',
						textTransform: 'uppercase',
						alignSelf: 'center',
					}"
					>:filter</span
				>
				<span
					v-for="tech in selectedTechs"
					:key="tech"
					:style="{
						display: 'inline-flex',
						alignItems: 'center',
						gap: '6px',
						padding: '3px 4px 3px 8px',
						borderRadius: '3px',
						background: PAL.gold + '22',
						border: `1px solid ${PAL.gold}55`,
						font: `500 11px/1 ${MONO_STACK}`,
						color: PAL.gold,
					}"
					@click.stop
				>
					<TechIcon :name="tech" :size="14" />
					{{ tech }}
					<button
						:style="{
							all: 'unset',
							cursor: 'pointer',
							width: '16px',
							height: '16px',
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: '2px',
							color: PAL.gold,
							fontSize: '12px',
						}"
						:aria-label="`remove ${tech}`"
						@click.stop="removeTech(tech)"
						@mouseenter="(e) => ((e.currentTarget as HTMLElement).style.background = PAL.gold + '33')"
						@mouseleave="(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')"
					>
						✕
					</button>
				</span>
				<input
					v-model="query"
					type="text"
					autocomplete="off"
					:placeholder="selectedTechs.length ? '' : t('projects.filter.placeholder')"
					:style="{
						all: 'unset',
						flex: 1,
						minWidth: '120px',
						padding: '4px 2px',
						font: `500 12px/1 ${MONO_STACK}`,
						color: themeTokens.fg,
					}"
					@focus="open_ = true"
					@blur="onBlur"
					@keydown.enter.prevent="suggestions.length > 0 && addTech(suggestions[0])"
					@keydown.backspace="
						query === '' && selectedTechs.length && removeTech(selectedTechs[selectedTechs.length - 1])
					"
				/>
				<button
					v-if="selectedTechs.length"
					:style="{
						all: 'unset',
						cursor: 'pointer',
						padding: '4px 8px',
						font: `500 11px/1 ${MONO_STACK}`,
						color: themeTokens.dim,
						letterSpacing: '0.3px',
						textTransform: 'uppercase',
					}"
					@click.stop="clearAll"
					@mouseenter="(e) => ((e.currentTarget as HTMLElement).style.color = PAL.gold)"
					@mouseleave="(e) => ((e.currentTarget as HTMLElement).style.color = themeTokens.dim)"
				>
					{{ t("projects.filter.clear") }}
				</button>
			</div>

			<!-- ── Suggestions popover ─────────────────────────────── -->
			<div
				v-if="open_ && suggestions.length > 0"
				:style="{
					position: 'absolute',
					top: 'calc(100% + 4px)',
					left: 0,
					right: 0,
					maxHeight: '240px',
					overflowY: 'auto',
					background: themeTokens.bg,
					border: `1px solid ${themeTokens.border}`,
					borderRadius: '4px',
					boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
					zIndex: 10,
					padding: '4px',
				}"
			>
				<button
					v-for="tech in suggestions"
					:key="tech"
					:style="{
						all: 'unset',
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						padding: '6px 10px',
						borderRadius: '3px',
						font: `500 12px/1 ${MONO_STACK}`,
						color: themeTokens.fg,
						width: '100%',
						boxSizing: 'border-box',
					}"
					@mousedown.prevent="addTech(tech)"
					@mouseenter="
						(e) =>
							((e.currentTarget as HTMLElement).style.background = isDark
								? 'rgba(199,167,99,0.10)'
								: 'rgba(199,167,99,0.16)')
					"
					@mouseleave="(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')"
				>
					<TechIcon :name="tech" :size="16" />
					{{ tech }}
				</button>
			</div>
		</div>

		<div
			v-if="visibleProjects.length === 0"
			:style="{
				marginTop: '24px',
				padding: '32px 28px',
				border: `1px dashed ${themeTokens.border}`,
				borderRadius: '6px',
				font: `500 13px/1.5 ${MONO_STACK}`,
				color: themeTokens.dim,
				textAlign: 'center',
			}"
		>
			{{ t("projects.filter.empty", { tech: selectedTechs.join(" + ") }) }}
		</div>

		<div
			v-else
			:style="{
				marginTop: '24px',
				display: 'flex',
				flexDirection: 'column',
				gap: '1px',
				border: `1px solid ${themeTokens.border}`,
				borderRadius: '6px',
				overflow: 'hidden',
			}"
		>
			<RevealOnScroll v-for="(p, i) in visibleProjects" :key="p.id" :delay="i * 60">
				<div
					class="v2-proj-row"
					role="button"
					tabindex="0"
					:style="{
						cursor: 'pointer',
						display: 'grid',
						gridTemplateColumns: '1fr auto auto',
						gap: '24px',
						alignItems: 'center',
						padding: '24px 28px',
						width: '100%',
						boxSizing: 'border-box',
						background: themeTokens.panel,
						transition: 'background .2s, padding-left .25s',
						borderBottom: i < visibleProjects.length - 1 ? `1px solid ${themeTokens.border}` : 'none',
						outline: 'none',
					}"
					@click="open(p)"
					@keydown.enter.prevent="open(p)"
					@keydown.space.prevent="open(p)"
					@mouseenter="
						(e) => {
							const el = e.currentTarget as HTMLElement;
							el.style.background = isDark ? 'rgba(199,167,99,0.12)' : 'rgba(199,167,99,0.18)';
							el.style.paddingLeft = '36px';
						}
					"
					@mouseleave="
						(e) => {
							const el = e.currentTarget as HTMLElement;
							el.style.background = themeTokens.panel;
							el.style.paddingLeft = '28px';
						}
					"
				>
					<span :style="{ minWidth: 0 }">
						<div
							class="v2-proj-title"
							:style="{
								font: '600 22px/1.2 Inter, sans-serif',
								color: themeTokens.fg,
								marginBottom: '4px',
								display: 'flex',
								alignItems: 'baseline',
								gap: '10px',
								flexWrap: 'wrap',
							}"
						>
							<span>{{ t(p.titleKey) }}</span>
							<span
								v-if="t(p.subtitleKey)"
								:style="{
									font: '500 13px/1.2 Inter, sans-serif',
									color: themeTokens.dim,
									opacity: 0.8,
								}"
								>{{ t(p.subtitleKey) }}</span
							>
						</div>
						<div
							class="v2-proj-tagline"
							:style="{
								font: '400 15px/1.4 Inter, sans-serif',
								color: themeTokens.dim,
							}"
						>
							{{ t(p.taglineKey) }}
						</div>
					</span>
					<span class="v2-proj-stack" :style="{ display: 'flex', gap: '6px', alignItems: 'center' }">
						<template v-for="s in p.stack.slice(0, 4)" :key="s">
							<a
								v-if="getTechHome(s)"
								:href="getTechHome(s)"
								target="_blank"
								rel="noopener noreferrer"
								:title="s"
								:aria-label="s"
								:style="{ display: 'inline-flex', textDecoration: 'none' }"
								@click.stop
							>
								<TechIcon :name="s" :size="22" />
							</a>
							<TechIcon v-else :name="s" :size="22" />
						</template>
						<span
							v-if="p.stack.length > 4"
							:style="{
								font: `500 11px/1 ${MONO_STACK}`,
								color: themeTokens.dim,
								marginLeft: '2px',
							}"
							>+{{ p.stack.length - 4 }}</span
						>
					</span>
					<span
						class="v2-proj-year"
						:style="{
							font: `500 13px/1 ${MONO_STACK}`,
							color: themeTokens.dim,
						}"
						>{{ p.year }}</span
					>
				</div>
			</RevealOnScroll>
		</div>

		<div
			v-if="hasMore"
			:style="{
				marginTop: '24px',
				display: 'flex',
				justifyContent: 'center',
			}"
		>
			<button
				:style="{
					all: 'unset',
					cursor: 'pointer',
					display: 'inline-flex',
					alignItems: 'center',
					gap: '10px',
					padding: '10px 18px',
					border: `1px solid ${themeTokens.border}`,
					borderRadius: '4px',
					font: `500 12px/1 ${MONO_STACK}`,
					color: PAL.gold,
					letterSpacing: '0.5px',
					textTransform: 'uppercase',
					background: themeTokens.panel,
					transition: 'background .15s, border-color .15s',
				}"
				@mouseenter="
					(e) => {
						const el = e.currentTarget as HTMLElement;
						el.style.background = isDark ? 'rgba(199,167,99,0.10)' : 'rgba(199,167,99,0.16)';
						el.style.borderColor = PAL.gold;
					}
				"
				@mouseleave="
					(e) => {
						const el = e.currentTarget as HTMLElement;
						el.style.background = themeTokens.panel;
						el.style.borderColor = themeTokens.border;
					}
				"
				@click="expanded = !expanded"
			>
				{{ expanded ? t("projects.seeLess") : t("projects.seeMore", { n: PORTFOLIO.projects.length - INITIAL_COUNT }) }}
				<span :style="{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }">▾</span>
			</button>
		</div>
	</section>
</template>
