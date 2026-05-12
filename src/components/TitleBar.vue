<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { themeChoice, setTheme } from "../lib/theme";
import { langChoice, setLang } from "../lib/language";
import { PORTFOLIO } from "../lib/portfolio";
import SegmentedSwitch from "./SegmentedSwitch.vue";
import TerminalIcon from "./TerminalIcon.vue";
import FlagIcon from "./FlagIcon.vue";

const { t } = useI18n();
</script>

<template>
	<!--
	  Responsive layout:
	  - Default (>1440px): 3-col grid, label centered, switches right
	  - ≤1440 (incl. tablet): flex space-between, label hugs left, switches right
	  - ≤720: hide label, switches take full width
	  - ≤560: label visible left (ellipsis), switches grouped right; pill-mode handled by SegmentedSwitch
	-->
	<header
		class="v2-titlebar grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-border px-4 font-mono text-xs font-medium leading-none text-dim @max-[1440px]:flex @max-[1440px]:justify-between @max-[720px]:justify-between @max-[560px]:gap-1.5 @max-[440px]:px-4"
	>
		<span aria-hidden="true" class="@max-[1440px]:hidden" />
		<span
			class="v2-titlebar-label whitespace-nowrap text-center @max-[560px]:inline-block @max-[720px]:hidden @max-[560px]:min-w-0 @max-[560px]:flex-[0_1_auto] @max-[560px]:overflow-hidden @max-[560px]:text-ellipsis @max-[1440px]:text-left @max-[560px]:text-left"
		>
			~/portfolio - {{ PORTFOLIO.handle }}
		</span>
		<div
			class="v2-titlebar-switches inline-flex items-center gap-2 justify-self-end @max-[560px]:w-auto @max-[720px]:w-full @max-[560px]:shrink-0 @max-[560px]:justify-end @max-[720px]:justify-between @max-[1440px]:justify-self-auto"
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
					<span class="inline-flex h-[11px] w-4 shrink-0 items-center justify-center">
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
