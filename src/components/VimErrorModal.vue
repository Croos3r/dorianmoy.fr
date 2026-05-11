<script lang="ts" setup>
import { onBeforeUnmount, onMounted, watch } from "vue";
import { PAL, MONO_STACK } from "../lib/palette";
import { themeTokens } from "../lib/theme";

const props = defineProps<{
	show: boolean;
	code: string;
	message: string;
}>();
const emit = defineEmits<{ (e: "close"): void }>();

const onKey = (e: KeyboardEvent) => {
	if (!props.show) return;
	if (e.key === "Escape" || e.key === "q" || e.key === "Enter") {
		e.preventDefault();
		emit("close");
	}
};

onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => {
	window.removeEventListener("keydown", onKey);
	document.body.style.overflow = "";
});

watch(
	() => props.show,
	(v) => {
		document.body.style.overflow = v ? "hidden" : "";
	},
	{ immediate: true },
);
</script>

<template>
	<div
		v-if="show"
		:style="{
			position: 'fixed',
			inset: 0,
			zIndex: 1100,
			background: 'rgba(0,0,0,0.55)',
			backdropFilter: 'blur(6px)',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			padding: 'clamp(12px, 4vh, 40px)',
			animation: 'pm-fade .2s ease',
		}"
		@click="emit('close')"
	>
		<div
			:style="{
				background: themeTokens.bg,
				color: themeTokens.fg,
				width: 'min(520px, 100%)',
				borderRadius: '8px',
				overflow: 'hidden',
				border: `1px solid ${themeTokens.border}`,
				fontFamily: 'Inter, system-ui, sans-serif',
				animation: 'pm-slide .25s cubic-bezier(.2,.7,.2,1)',
				boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
			}"
			@click.stop
		>
			<div
				:style="{
					padding: '14px 18px',
					borderBottom: `1px solid ${themeTokens.border}`,
					font: `500 11px/1 ${MONO_STACK}`,
					color: themeTokens.dim,
					letterSpacing: '1px',
					textTransform: 'uppercase',
				}"
			>
				{{ code }}
			</div>
			<div
				:style="{
					padding: '28px 22px',
					font: `600 14px/1.4 ${MONO_STACK}`,
					color: '#e0234e',
					textAlign: 'center',
					wordBreak: 'break-word',
				}"
			>
				{{ message }}
			</div>
			<div
				:style="{
					padding: '0 22px 18px',
					display: 'flex',
					justifyContent: 'center',
				}"
			>
				<button
					:style="{
						all: 'unset',
						cursor: 'pointer',
						padding: '8px 14px',
						background: PAL.gold,
						color: PAL.ink,
						font: `600 12px/1 ${MONO_STACK}`,
						letterSpacing: '0.5px',
						textTransform: 'uppercase',
						borderRadius: '4px',
					}"
					@click="emit('close')"
				>
					OK
				</button>
			</div>
		</div>
	</div>
</template>
