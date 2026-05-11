<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { PAL, MONO_STACK, TAG_COLORS } from "../lib/palette";
import { themeTokens } from "../lib/theme";
import { PORTFOLIO } from "../lib/portfolio";
import TerminalIcon from "./TerminalIcon.vue";

const { t } = useI18n();

const form = reactive({ name: "", email: "", message: "" });
const touched = reactive<{ [k: string]: boolean }>({});
const status = ref<"idle" | "sending" | "sent">("idle");

const errors = computed<Record<string, string>>(() => {
	const e: Record<string, string> = {};
	if (!form.name.trim()) e.name = t("form.required");
	if (!form.email.trim()) e.email = t("form.required");
	else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t("form.invalidEmail");
	if (!form.message.trim()) e.message = t("form.required");
	else if (form.message.trim().length < 10) e.message = t("form.tooShort");
	return e;
});

const showErr = (k: string) => touched[k] && errors.value[k];

const submit = async (e: Event) => {
	e.preventDefault();
	touched.name = touched.email = touched.message = true;
	if (Object.keys(errors.value).length) return;
	status.value = "sending";
	await new Promise((r) => setTimeout(r, 900));
	status.value = "sent";
	const subject = encodeURIComponent(`Hello from ${form.name}`);
	const body = encodeURIComponent(`${form.message}\n\nFrom ${form.name}\n${form.email}`);
	window.location.href = `mailto:${PORTFOLIO.email}?subject=${subject}&body=${body}`;
};

const reset = () => {
	form.name = "";
	form.email = "";
	form.message = "";
	touched.name = touched.email = touched.message = false;
	status.value = "idle";
};

const fieldStyle = (k: string) => ({
	width: "100%",
	padding: "10px 12px",
	background: themeTokens.value.bg,
	color: themeTokens.value.fg,
	border: `1px solid ${showErr(k) ? "#e0234e" : themeTokens.value.border}`,
	borderRadius: "4px",
	font: `500 14px/1.4 ${MONO_STACK}`,
	outline: "none",
	transition: "border-color .15s, box-shadow .15s",
	boxSizing: "border-box" as const,
	resize: k === "message" ? ("vertical" as const) : undefined,
	minHeight: k === "message" ? "120px" : undefined,
});

const onFocus = (e: FocusEvent) => {
	const el = e.currentTarget as HTMLElement;
	el.style.borderColor = PAL.gold;
	el.style.boxShadow = `0 0 0 3px ${PAL.gold}1f`;
};
const onBlur = (k: string) => (e: FocusEvent) => {
	const el = e.currentTarget as HTMLElement;
	el.style.borderColor = showErr(k) ? "#e0234e" : themeTokens.value.border;
	el.style.boxShadow = "none";
	touched[k] = true;
};
</script>

<template>
	<div
		v-if="status === 'sent'"
		:style="{
			marginTop: '32px',
			padding: '28px',
			borderRadius: '6px',
			background: themeTokens.panel,
			border: `1px solid ${themeTokens.border}`,
			maxWidth: '640px',
			display: 'flex',
			alignItems: 'flex-start',
			gap: '16px',
		}"
	>
		<div
			:style="{
				width: '36px',
				height: '36px',
				borderRadius: '50%',
				background: TAG_COLORS.daily,
				color: '#fff',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexShrink: 0,
			}"
		>
			<TerminalIcon name="check" :size="20" stroke="currentColor" :sw="2" />
		</div>
		<div>
			<div
				:style="{
					font: '600 18px/1.3 Inter, sans-serif',
					color: themeTokens.fg,
				}"
			>
				{{ t("form.queued") }}
			</div>
			<div
				:style="{
					marginTop: '6px',
					font: `500 13px/1.5 ${MONO_STACK}`,
					color: themeTokens.dim,
				}"
			>
				{{ t("form.queuedBody") }}
				<a :href="`mailto:${PORTFOLIO.email}`" :style="{ color: PAL.amber }">{{ t("form.emailMe") }}</a
				>.
			</div>
			<button
				:style="{
					all: 'unset',
					cursor: 'pointer',
					marginTop: '16px',
					font: `500 12px/1 ${MONO_STACK}`,
					color: PAL.gold,
				}"
				@click="reset"
			>
				{{ t("form.sendAnother") }}
			</button>
		</div>
	</div>
	<form
		v-else
		novalidate
		:style="{
			marginTop: '32px',
			padding: '24px',
			borderRadius: '6px',
			background: themeTokens.panel,
			border: `1px solid ${themeTokens.border}`,
			maxWidth: '640px',
			display: 'flex',
			flexDirection: 'column',
			gap: '18px',
		}"
		@submit="submit"
	>
		<div v-for="k in ['name', 'email', 'message'] as const" :key="k">
			<label
				:for="`cf-${k}`"
				:style="{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					font: `500 11px/1 ${MONO_STACK}`,
					color: themeTokens.dim,
					letterSpacing: '0.5px',
					textTransform: 'lowercase',
					marginBottom: '6px',
				}"
			>
				<span><span :style="{ color: PAL.gold }">&gt;</span> {{ t(`form.${k}`) }}</span>
				<span v-if="showErr(k)" :style="{ color: '#e0234e', fontSize: '10px' }">// {{ errors[k] }}</span>
			</label>
			<textarea
				v-if="k === 'message'"
				:id="`cf-${k}`"
				v-model="form.message"
				:rows="5"
				:placeholder="t('form.messagePh')"
				:style="fieldStyle(k)"
				@focus="onFocus"
				@blur="onBlur(k)"
			/>
			<input
				v-else
				:id="`cf-${k}`"
				v-model="form[k]"
				:type="k === 'email' ? 'email' : 'text'"
				:autocomplete="k"
				:placeholder="t(`form.${k}Ph`)"
				:style="fieldStyle(k)"
				@focus="onFocus"
				@blur="onBlur(k)"
			/>
		</div>

		<div
			class="v2-form-actions"
			:style="{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				flexWrap: 'wrap',
				gap: '12px',
				paddingTop: '4px',
			}"
		>
			<span
				:style="{
					font: `500 11px/1 ${MONO_STACK}`,
					color: themeTokens.dim,
				}"
			>
				<template v-if="status === 'sending'"
					><span :style="{ color: PAL.amber }">●</span> {{ t("form.sending") }}</template
				>
				<template v-else
					><span :style="{ color: TAG_COLORS.daily }">●</span> {{ t("form.ready") }} ·
					{{ t("form.chars", { n: form.message.length }) }}</template
				>
			</span>
			<button
				type="submit"
				class="v2-form-submit"
				:disabled="status === 'sending'"
				:style="{
					all: 'unset',
					cursor: status === 'sending' ? 'wait' : 'pointer',
					display: 'inline-flex',
					alignItems: 'center',
					gap: '10px',
					padding: '12px 20px',
					background: PAL.gold,
					color: PAL.ink,
					font: `600 13px/1 ${MONO_STACK}`,
					letterSpacing: '0.5px',
					textTransform: 'uppercase',
					borderRadius: '4px',
					opacity: status === 'sending' ? 0.6 : 1,
					transition: 'transform .15s, opacity .2s',
				}"
				@mouseenter="
					(e) => {
						if (status !== 'sending') (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
					}
				"
				@mouseleave="(e) => ((e.currentTarget as HTMLElement).style.transform = 'translateY(0)')"
			>
				{{ t("form.send") }} <TerminalIcon name="send" :size="14" />
			</button>
		</div>
	</form>
</template>
