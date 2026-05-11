<script lang="ts" setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { PAL, MONO_STACK } from "../lib/palette";
import { themeTokens, isDark } from "../lib/theme";
import { PORTFOLIO, type Project } from "../lib/portfolio";
import { getTechHome } from "../lib/techRegistry";
import RevealOnScroll from "../components/RevealOnScroll.vue";
import TechIcon from "../components/TechIcon.vue";

const { t } = useI18n();

const emit = defineEmits<{ (e: "open-project", p: Project): void }>();
const open = (p: Project) => emit("open-project", p);

const INITIAL_COUNT = 5;
const expanded = ref(false);
const visibleProjects = computed(() =>
	expanded.value ? PORTFOLIO.projects : PORTFOLIO.projects.slice(0, INITIAL_COUNT),
);
const hasMore = computed(() => PORTFOLIO.projects.length > INITIAL_COUNT);
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
		<div
			:style="{
				marginTop: '32px',
				display: 'flex',
				flexDirection: 'column',
				gap: '1px',
				border: `1px solid ${themeTokens.border}`,
				borderRadius: '6px',
				overflow: 'hidden',
			}"
		>
			<RevealOnScroll
				v-for="(p, i) in visibleProjects"
				:key="p.id"
				:delay="i * 60"
			>
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
						borderBottom:
							i < visibleProjects.length - 1
								? `1px solid ${themeTokens.border}`
								: 'none',
						outline: 'none',
					}"
					@click="open(p)"
					@keydown.enter.prevent="open(p)"
					@keydown.space.prevent="open(p)"
					@mouseenter="
						(e) => {
							const el = e.currentTarget as HTMLElement;
							el.style.background = isDark
								? 'rgba(199,167,99,0.12)'
								: 'rgba(199,167,99,0.18)';
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
					<span
						class="v2-proj-stack"
						:style="{ display: 'flex', gap: '6px', alignItems: 'center' }"
					>
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
						el.style.background = isDark
							? 'rgba(199,167,99,0.10)'
							: 'rgba(199,167,99,0.16)';
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
				{{
					expanded
						? t("projects.seeLess")
						: t("projects.seeMore", { n: PORTFOLIO.projects.length - INITIAL_COUNT })
				}}
				<span :style="{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }">▾</span>
			</button>
		</div>
	</section>
</template>
