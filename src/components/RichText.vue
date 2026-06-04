<script lang="ts" setup>
import { computed } from "vue";

// Renders a translation string that may contain <strong>…</strong> emphasis
// WITHOUT v-html: the string is split into plain and emphasised segments and
// rendered as real text/elements. Because every segment is output through text
// interpolation (which escapes HTML), no markup beyond the recognised <strong>
// pairs can ever be injected — safe even if the source text were untrusted.
const props = defineProps<{ text: string }>();

type Segment = { text: string; strong: boolean };

const segments = computed<Segment[]>(() => {
	const out: Segment[] = [];
	const re = /<strong>(.*?)<\/strong>/gs;
	let last = 0;
	let m: RegExpExecArray | null;
	while ((m = re.exec(props.text))) {
		if (m.index > last) out.push({ text: props.text.slice(last, m.index), strong: false });
		out.push({ text: m[1], strong: true });
		last = m.index + m[0].length;
	}
	if (last < props.text.length) out.push({ text: props.text.slice(last), strong: false });
	return out;
});
</script>

<template>
	<template v-for="(seg, i) in segments" :key="i"
		><strong v-if="seg.strong">{{ seg.text }}</strong
		><template v-else>{{ seg.text }}</template></template
	>
</template>
