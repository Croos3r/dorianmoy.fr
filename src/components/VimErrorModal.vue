<script lang="ts" setup>
import { onBeforeUnmount, onMounted, watch } from "vue";

const props = defineProps<{
	show: boolean;
	code: string;
	message: string;
}>();
const emit = defineEmits<{ close: [] }>();

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
		class="vm-fade fixed inset-0 z-[1100] flex items-center justify-center bg-black/55 backdrop-blur-md"
		style="padding: clamp(12px, 4vh, 40px)"
		@click="emit('close')"
	>
		<div
			class="vm-slide w-[min(520px,100%)] overflow-hidden rounded-lg border border-border bg-bg font-sans text-fg shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
			@click.stop
		>
			<div
				class="border-b border-border px-[18px] py-3.5 font-mono text-[11px] font-medium uppercase leading-none tracking-widest text-dim"
			>
				{{ code }}
			</div>
			<div class="break-words px-[22px] py-7 text-center font-mono text-sm font-semibold leading-snug text-err">
				{{ message }}
			</div>
			<div class="flex justify-center px-[22px] pb-[18px]">
				<button
					type="button"
					class="cursor-pointer rounded bg-gold px-3.5 py-2 font-mono text-xs font-semibold uppercase leading-none tracking-wider text-ink"
					@click="emit('close')"
				>
					OK
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.vm-fade {
	animation: vm-fade 0.2s ease;
}
.vm-slide {
	animation: vm-slide 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
}
@keyframes vm-fade {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
@keyframes vm-slide {
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
