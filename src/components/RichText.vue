<script lang="ts" setup>
import { computed } from "vue";
import { parseRichText } from "../lib/richText";

// Renders a translation string that may contain <strong>…</strong> emphasis
// WITHOUT v-html: the string is split into plain and emphasised segments and
// rendered as real text/elements. Because every segment is output through text
// interpolation (which escapes HTML), no markup beyond the recognised <strong>
// pairs can ever be injected — safe even if the source text were untrusted.
const props = defineProps<{ text: string }>();

const segments = computed(() => parseRichText(props.text));
</script>

<template>
	<template v-for="(seg, i) in segments" :key="i"
		><strong v-if="seg.strong">{{ seg.text }}</strong
		><template v-else>{{ seg.text }}</template></template
	>
</template>
