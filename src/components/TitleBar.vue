<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { themeChoice, setTheme } from "../lib/theme";
import { langChoice, setLang } from "../lib/language";
import { themeTokens } from "../lib/theme";
import { PORTFOLIO } from "../lib/portfolio";
import { MONO_STACK } from "../lib/palette";
import SegmentedSwitch from "./SegmentedSwitch.vue";
import TerminalIcon from "./TerminalIcon.vue";
import FlagIcon from "./FlagIcon.vue";

const { t } = useI18n();
</script>

<template>
	<header
		class="v2-titlebar"
		:style="{
			display: 'grid',
			gridTemplateColumns: '1fr auto 1fr',
			alignItems: 'center',
			padding: '0 16px',
			gap: '16px',
			borderBottom: `1px solid ${themeTokens.border}`,
			font: `500 12px/1 ${MONO_STACK}`,
			color: themeTokens.dim,
		}"
	>
		<span aria-hidden="true" />
		<span
			class="v2-titlebar-label"
			:style="{ textAlign: 'center', whiteSpace: 'nowrap' }"
		>
			~/portfolio - {{ PORTFOLIO.handle }}
		</span>
		<div
			class="v2-titlebar-switches"
			:style="{
				display: 'inline-flex',
				alignItems: 'center',
				gap: '8px',
				justifySelf: 'end',
			}"
		>
			<SegmentedSwitch
				:options="[
					{ id: 'en', label: t('lang.english'), title: t('lang.english') },
					{ id: 'system', label: t('lang.system'), title: t('lang.system') },
					{ id: 'fr', label: t('lang.french'), title: t('lang.french') },
				]"
				:value="langChoice"
				:slot-width="92"
				group-label="language"
				@update:value="(v) => setLang(v as 'en' | 'system' | 'fr')"
			>
				<template #icon="{ option }">
					<span
						:style="{
							width: '16px',
							height: '11px',
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexShrink: 0,
						}"
					>
						<FlagIcon v-if="option.id === 'en'" code="en" :w="14" />
						<FlagIcon v-else-if="option.id === 'fr'" code="fr" :w="14" />
						<TerminalIcon v-else name="monitor" :size="10" stroke="currentColor" />
					</span>
				</template>
			</SegmentedSwitch>

			<SegmentedSwitch
				:options="[
					{ id: 'light', label: t('theme.light'), title: t('theme.light') },
					{ id: 'system', label: t('theme.system'), title: t('theme.system') },
					{ id: 'dark', label: t('theme.dark'), title: t('theme.dark') },
				]"
				:value="themeChoice"
				:slot-width="76"
				group-label="theme"
				@update:value="(v) => setTheme(v as 'light' | 'system' | 'dark')"
			>
				<template #icon="{ option }">
					<TerminalIcon
						:name="option.id === 'light' ? 'sun' : option.id === 'dark' ? 'moon' : 'monitor'"
						:size="11"
						stroke="currentColor"
					/>
				</template>
			</SegmentedSwitch>
		</div>
	</header>
</template>
