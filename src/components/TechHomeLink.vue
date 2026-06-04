<script lang="ts" setup>
import { computed } from "vue";
import { getTechHome, type TechName } from "../lib/techRegistry";

// Renders its slot wrapped in an external link to the technology's homepage
// when one is known, otherwise in a plain inline wrapper. Centralises the
// `getTechHome ? <a target rel> : <span>` boilerplate that was repeated across
// the projects/stack views. Attributes (class, aria-label, listeners) fall
// through to whichever element is rendered; the slot receives `linked` so
// callers can style link-only affordances (e.g. an underline).
defineOptions({ inheritAttrs: false });

const props = defineProps<{ name: TechName }>();
const href = computed(() => getTechHome(props.name));
</script>

<template>
	<a v-if="href" v-bind="$attrs" :href="href" target="_blank" rel="noopener noreferrer">
		<slot :linked="true" />
	</a>
	<span v-else v-bind="$attrs">
		<slot :linked="false" />
	</span>
</template>
