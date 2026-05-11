<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { PAL, MONO_STACK, TAG_COLORS } from "../lib/palette";
import { themeTokens, isDark } from "../lib/theme";
import { PORTFOLIO } from "../lib/portfolio";
import { getTechHome } from "../lib/techRegistry";
import { setFilter, scrollToProjects } from "../lib/filters";
import RevealOnScroll from "../components/RevealOnScroll.vue";
import TerminalIcon from "../components/TerminalIcon.vue";
import TechIcon from "../components/TechIcon.vue";

const { t } = useI18n();

const filterByTech = (tech: string) => {
	setFilter([tech]);
	scrollToProjects();
};
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
			<span :style="{ color: PAL.gold }">02</span> &nbsp;/&nbsp; stack.yaml
		</div>
		<RevealOnScroll>
			<h2
				:style="{
					margin: 0,
					font: '700 36px/1.3 Inter, sans-serif',
					color: themeTokens.fg,
				}"
			>
				{{ t("stack.title") }}
			</h2>
		</RevealOnScroll>

		<div
			class="v2-stack-grid"
			:style="{
				marginTop: '32px',
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)',
				gap: '24px',
			}"
		>
			<RevealOnScroll v-for="(c, i) in PORTFOLIO.competencies" :key="c.labelKey" :delay="i * 80">
				<div
					:style="{
						border: `1px solid ${themeTokens.border}`,
						background: themeTokens.panel,
						padding: '24px',
						borderRadius: '6px',
					}"
				>
					<div
						:style="{
							display: 'flex',
							alignItems: 'center',
							gap: '10px',
							marginBottom: '20px',
						}"
					>
						<TerminalIcon :name="c.icon" :size="16" :stroke="PAL.gold" />
						<span
							:style="{
								font: `500 12px/1 ${MONO_STACK}`,
								color: PAL.gold,
								letterSpacing: '1px',
								textTransform: 'uppercase',
							}"
							>{{ t(c.labelKey) }}</span
						>
					</div>
					<ul
						:style="{
							listStyle: 'none',
							margin: 0,
							padding: 0,
							display: 'flex',
							flexDirection: 'column',
							gap: '10px',
						}"
					>
						<li v-for="it in c.items" :key="it.name">
							<div
								role="button"
								tabindex="0"
								:aria-label="`filter projects by ${it.name}`"
								:style="{
									cursor: 'pointer',
									display: 'grid',
									gridTemplateColumns: 'auto 1fr auto',
									alignItems: 'center',
									gap: '12px',
									padding: '6px 8px',
									margin: '0 -8px',
									borderRadius: '4px',
									transition: 'background .15s',
								}"
								@click="filterByTech(it.name)"
								@keydown.enter.prevent="filterByTech(it.name)"
								@keydown.space.prevent="filterByTech(it.name)"
								@mouseenter="
									(e) =>
										((e.currentTarget as HTMLElement).style.background = isDark
											? 'rgba(199,167,99,0.10)'
											: 'rgba(199,167,99,0.14)')
								"
								@mouseleave="(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')"
							>
								<!-- Logo + name route to the tech's homepage. Click here is
								     captured before bubbling, so the parent filter action
								     doesn't also fire. -->
								<a
									v-if="getTechHome(it.name)"
									:href="getTechHome(it.name)"
									target="_blank"
									rel="noopener noreferrer"
									class="v2-tech-link"
									:style="{
										gridColumn: '1 / span 2',
										justifySelf: 'start',
										width: 'fit-content',
										display: 'inline-flex',
										alignItems: 'center',
										gap: '12px',
										textDecoration: 'none',
										color: 'inherit',
										minWidth: 0,
									}"
									@click.stop
								>
									<TechIcon :name="it.name" :size="26" />
									<span
										class="v2-tech-name"
										:style="{
											font: '500 14px/1.2 Inter, sans-serif',
											color: themeTokens.fg,
										}"
										>{{ it.name }}</span
									>
								</a>
								<template v-else>
									<TechIcon :name="it.name" :size="26" />
									<span
										:style="{
											font: '500 14px/1.2 Inter, sans-serif',
											color: themeTokens.fg,
										}"
										>{{ it.name }}</span
									>
								</template>
								<span
									:style="{
										display: 'inline-flex',
										alignItems: 'center',
										gap: '6px',
										padding: '4px 8px',
										borderRadius: '4px',
										background: TAG_COLORS[it.tag] + '1f',
										color: TAG_COLORS[it.tag],
										font: `500 10px/1 ${MONO_STACK}`,
										letterSpacing: '0.5px',
										textTransform: 'uppercase',
									}"
								>
									<span
										:style="{
											width: '5px',
											height: '5px',
											borderRadius: '50%',
											background: TAG_COLORS[it.tag],
										}"
									/>
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
