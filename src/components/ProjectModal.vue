<script lang="ts" setup>
import { onBeforeUnmount, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { getTechHome } from "../lib/techRegistry";
import type { Project } from "../lib/portfolio";
import TerminalIcon from "./TerminalIcon.vue";
import TechIcon from "./TechIcon.vue";

const props = defineProps<{ project: Project | null }>();
const emit = defineEmits<{ close: [] }>();

const { t } = useI18n();

const onKey = (e: KeyboardEvent) => {
	if (e.key === "Escape") {
		emit("close");
		return;
	}
	if (e.key === "q" && !e.metaKey && !e.ctrlKey && !e.altKey) {
		const t = e.target as HTMLElement | null;
		if (t?.tagName === "INPUT" || t?.tagName === "TEXTAREA" || t?.isContentEditable) return;
		e.preventDefault();
		emit("close");
	}
};

onMounted(() => {
	window.addEventListener("keydown", onKey);
});
onBeforeUnmount(() => {
	window.removeEventListener("keydown", onKey);
	document.body.style.overflow = "";
});

watch(
	() => props.project,
	(p) => {
		document.body.style.overflow = p ? "hidden" : "";
	},
	{ immediate: true },
);
</script>

<template>
	<div
		v-if="project"
		class="pm-fade fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto bg-black/55 backdrop-blur-md"
		style="padding: clamp(12px, 4vh, 40px)"
		@click="emit('close')"
	>
		<div
			class="pm-slide w-[min(900px,100%)] overflow-hidden rounded-lg border border-border bg-bg font-sans text-fg shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
			@click.stop
		>
			<div
				class="flex items-center justify-between border-b border-border px-7 py-5 font-mono text-xs font-medium uppercase leading-none tracking-widest text-dim @max-[720px]:px-[18px] @max-[720px]:py-3.5"
			>
				<span>./projects/{{ project.index }} · {{ project.year }}</span>
				<button
					type="button"
					class="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-transparent text-fg transition-colors duration-200 hover:bg-border"
					aria-label="close"
					@click="emit('close')"
				>
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M6 6 L18 18" />
						<path d="M18 6 L6 18" />
					</svg>
				</button>
			</div>

			<div
				v-if="project.image"
				class="relative aspect-[16/9] overflow-hidden bg-ink text-cream dark:bg-cream dark:text-ink"
			>
				<img
					:src="project.image"
					:alt="t(project.titleKey)"
					width="1000"
					height="563"
					loading="lazy"
					decoding="async"
					class="block h-full w-full object-cover object-top"
				/>
				<div
					class="absolute left-5 top-[18px] rounded-[3px] bg-black/55 px-2.5 py-1.5 font-mono text-[11px] font-medium uppercase leading-none tracking-wider text-white backdrop-blur-[4px]"
				>
					./{{ project.id }}
				</div>
			</div>

			<div
				class="px-12 pb-12 @max-[720px]:px-5 @max-[720px]:pb-8 @max-[720px]:pt-7"
				:class="project.image ? 'pt-10' : 'pt-9'"
			>
				<div class="mb-4 font-mono text-xs font-medium uppercase leading-none tracking-[2px] text-gold">
					{{ t(project.taglineKey) }}
				</div>
				<h2
					class="m-0 flex flex-wrap items-baseline gap-3.5 font-sans font-bold leading-[1.1] tracking-[-1px] text-fg @max-[720px]:break-words @max-[720px]:text-[26px] @max-[720px]:leading-[1.15] @max-[720px]:tracking-[-0.5px]"
					style="font-size: clamp(28px, 5vw, 52px)"
				>
					<span>{{ t(project.titleKey) }}</span>
					<span
						v-if="t(project.subtitleKey)"
						class="font-sans font-medium leading-snug tracking-normal text-dim/80"
						style="font-size: clamp(14px, 1.6vw, 18px)"
						>{{ t(project.subtitleKey) }}</span
					>
				</h2>

				<div class="mt-7 flex flex-wrap gap-2">
					<template v-for="s in project.stack" :key="s">
						<a
							v-if="getTechHome(s)"
							:href="getTechHome(s)"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 rounded-[3px] border border-border px-2.5 py-1.5 font-mono text-xs font-medium leading-none tracking-wide no-underline transition-colors duration-150 hover:border-gold"
						>
							<TechIcon :name="s" :size="18" />
							<span class="text-gold underline decoration-1 underline-offset-[3px]">{{ s.toLowerCase() }}</span>
						</a>
						<span
							v-else
							class="inline-flex items-center gap-2 rounded-[3px] border border-border px-2.5 py-1.5 font-mono text-xs font-medium leading-none tracking-wide"
						>
							<TechIcon :name="s" :size="18" />
							<span class="text-gold">{{ s.toLowerCase() }}</span>
						</span>
					</template>
				</div>

				<p
					class="m-0 mt-8 max-w-[640px] text-[17px] font-normal leading-[1.65] text-fg/90 @max-[720px]:text-[15px] @max-[720px]:leading-[1.6]"
				>
					{{ t(project.bodyKey) }}
				</p>

				<div v-if="project.url" class="mt-10 flex flex-wrap gap-4">
					<a
						:href="project.url"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2.5 rounded bg-gold px-6 py-3.5 font-sans text-sm font-semibold leading-none text-ink no-underline"
					>
						{{ t("modal.visit") }} <TerminalIcon name="arrowUR" :size="14" />
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.pm-fade {
	animation: pm-fade 0.25s ease;
}
.pm-slide {
	animation: pm-slide 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
}
@keyframes pm-fade {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
@keyframes pm-slide {
	from {
		transform: translateY(20px);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
}
</style>
