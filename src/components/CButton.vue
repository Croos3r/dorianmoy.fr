<script lang="ts" setup>
export type CButtonProps = {
	title: string;
	variant: "fill" | "line";
};

const { variant } = withDefaults(defineProps<CButtonProps>(), {
	variant: "fill",
});
const dynamicStyle =
	variant === "fill" ? "bg-primary dark:text-light text-dark" : "border border-primary text-primary  border-2";
</script>

<template>
	<button :class="`px-[7.5rem] py-5 ${dynamicStyle}`">
		{{ title }}
	</button>
</template>

<style scoped></style>
