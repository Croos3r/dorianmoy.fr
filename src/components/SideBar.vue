<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { PORTFOLIO } from "../lib/portfolio";
import TerminalIcon from "./TerminalIcon.vue";

export type FileEntry = {
	id: string;
	name: string;
	type: "markdown" | "yaml" | "dir" | "typescript";
};

defineProps<{
	files: FileEntry[];
	active: string;
	selIdx: number;
}>();

const emit = defineEmits<{
	navigate: [id: string, idx: number];
}>();

const { t } = useI18n();

const glyphFor = (type: FileEntry["type"]) => {
	switch (type) {
		case "markdown":
			return { ch: "M", col: "#519aba" };
		case "yaml":
			return { ch: "Y", col: "#cb171e" };
		case "dir":
			return { ch: "▸", col: "rgb(199,167,99)" };
		case "typescript":
			return { ch: "T", col: "#3178c6" };
	}
};

const resumeUrl = computed(() => t("resume.url"));
const resumeFilename = computed(() => t("resume.filename"));
</script>

<template>
	<aside class="v2-sidebar overflow-y-auto border-r border-border bg-panel py-2.5 @max-[820px]:hidden">
		<div
			class="flex items-center gap-2 border-b border-border px-3 pb-2.5 pt-1.5 font-mono text-xs font-semibold leading-snug text-gold"
		>
			<TerminalIcon name="folder" :size="13" stroke="rgb(199,167,99)" :sw="1.75" />
			<span>~/portfolio</span>
		</div>

		<div class="py-1.5">
			<button
				v-for="(f, i) in files"
				:key="f.id"
				type="button"
				class="relative flex w-full cursor-pointer items-center gap-2 border-0 px-3 py-0.5 font-mono text-[13px] leading-snug"
				:class="[
					active === f.id ? 'font-bold' : 'font-medium',
					active === f.id || selIdx === i ? 'text-fg' : 'text-dim',
					selIdx === i ? 'bg-panel-hover dark:bg-panel-hover' : 'bg-transparent',
				]"
				@click="emit('navigate', f.id, i)"
			>
				<span
					aria-hidden="true"
					class="absolute bottom-0 left-0 top-0 w-0.5"
					:class="selIdx === i ? 'bg-gold' : 'bg-transparent'"
				/>
				<span aria-hidden="true" class="relative min-h-[22px] w-3.5 shrink-0 self-stretch">
					<span
						class="absolute left-[5px] top-0 border-l border-dim opacity-50"
						:class="i === files.length - 1 ? 'bottom-1/2' : 'bottom-0'"
					/>
					<span class="absolute left-[5px] top-1/2 w-[7px] border-t border-dim opacity-50" />
				</span>
				<span class="w-3.5 text-center text-xs font-bold" :style="{ color: glyphFor(f.type).col }">{{
					glyphFor(f.type).ch
				}}</span>
				<span class="flex-1 text-left">{{ f.name }}</span>
			</button>
		</div>

		<div
			class="mt-3.5 border-t border-border px-3 pb-1 pt-3 font-mono text-[10px] font-semibold uppercase leading-none tracking-widest text-dim"
		>
			<span class="mr-1.5 text-gold">:reg</span>
			{{ t("sidebar.marks") }}
		</div>
		<a
			v-for="(s, i) in PORTFOLIO.socials"
			:key="s.label"
			:href="s.href"
			target="_blank"
			rel="noopener noreferrer"
			class="flex items-center gap-2 px-3 py-[3px] font-mono text-[13px] font-medium leading-normal text-dim no-underline transition-colors duration-150 hover:text-gold"
		>
			<span class="w-3.5 text-gold/70">"{{ ["a", "b", "c", "d", "e"][i] || "*" }}</span>
			<span class="flex-1">{{ s.label.toLowerCase() }}</span>
			<TerminalIcon name="arrowUR" :size="11" />
		</a>

		<a
			:href="resumeUrl"
			:download="resumeFilename"
			class="flex items-center gap-2 px-3 py-[3px] font-mono text-[13px] font-medium leading-normal text-gold no-underline"
		>
			<span class="w-3.5 text-gold/70">"r</span>
			<span class="flex-1">{{ t("resume.label") }}</span>
			<TerminalIcon name="download" :size="11" stroke="rgb(199,167,99)" />
		</a>

		<div
			class="mx-3 mb-1 mt-[18px] border-t border-border pt-3 font-mono text-[10px] font-medium leading-[1.7] text-dim opacity-75"
		>
			<div class="flex gap-1.5">
				<span class="min-w-[38px] text-gold">j&nbsp;↓&nbsp;k&nbsp;↑</span><span>{{ t("sidebar.move") }}</span>
			</div>
			<div class="flex gap-1.5">
				<span class="min-w-[38px] text-gold">g&nbsp;⇞&nbsp;G&nbsp;⇟</span><span>{{ t("sidebar.topbot") }}</span>
			</div>
			<div class="flex gap-1.5">
				<span class="min-w-[38px] text-gold">↵</span><span>{{ t("sidebar.open") }}</span>
			</div>
			<div class="flex gap-1.5">
				<span class="min-w-[38px] text-gold">"a</span><span>{{ t("sidebar.mark") }}</span>
			</div>
		</div>
	</aside>
</template>
