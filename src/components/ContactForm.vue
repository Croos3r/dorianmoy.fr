<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { PORTFOLIO } from "../lib/portfolio";
import TerminalIcon from "./TerminalIcon.vue";

const { t } = useI18n();

const form = reactive({ name: "", email: "", message: "" });
const touched = reactive<{ [k: string]: boolean }>({});
const status = ref<"idle" | "sending" | "sent" | "error">("idle");
const errorDetail = ref("");

const API_ENDPOINT = "https://api.dorianmoy.fr/messages";
const API_DOMAIN = "dorianmoy.fr";

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
	errorDetail.value = "";
	try {
		const res = await fetch(API_ENDPOINT, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: form.name.trim(),
				mail: form.email.trim(),
				message: form.message.trim(),
				domain: API_DOMAIN,
			}),
		});
		if (!res.ok) {
			let detail = `${res.status} ${res.statusText}`.trim();
			try {
				const data = await res.json();
				if (data?.message && typeof data.message === "string") detail = data.message;
			} catch {
				/* response body wasn't JSON — keep the status code as detail */
			}
			throw new Error(detail);
		}
		status.value = "sent";
	} catch (err) {
		status.value = "error";
		errorDetail.value = err instanceof Error ? err.message : String(err);
	}
};

const reset = () => {
	form.name = "";
	form.email = "";
	form.message = "";
	touched.name = touched.email = touched.message = false;
	status.value = "idle";
	errorDetail.value = "";
};

const retry = () => {
	status.value = "idle";
	errorDetail.value = "";
};

const onBlur = (k: string) => () => {
	touched[k] = true;
};
</script>

<template>
	<div
		v-if="status === 'sent'"
		class="mt-8 flex max-w-[640px] items-start gap-4 rounded-md border border-border bg-panel p-7"
	>
		<div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tag-daily text-white">
			<TerminalIcon name="check" :size="20" stroke="currentColor" :sw="2" />
		</div>
		<div>
			<div class="font-sans text-lg font-semibold leading-snug text-fg">
				{{ t("form.sentTitle") }}
			</div>
			<div class="mt-1.5 font-mono text-[13px] font-medium leading-normal text-dim">
				{{ t("form.sentBody") }}
			</div>
			<button
				type="button"
				class="mt-4 cursor-pointer bg-transparent p-0 font-mono text-xs font-medium leading-none text-gold"
				@click="reset"
			>
				{{ t("form.sendAnother") }}
			</button>
		</div>
	</div>

	<div
		v-else-if="status === 'error'"
		class="mt-8 flex max-w-[640px] items-start gap-4 rounded-md border border-err/40 bg-panel p-7"
	>
		<div
			class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-err font-mono text-base font-bold text-white"
		>
			!
		</div>
		<div>
			<div class="font-sans text-lg font-semibold leading-snug text-fg">
				{{ t("form.errorTitle") }}
			</div>
			<div class="mt-1.5 font-mono text-[13px] font-medium leading-normal text-dim">
				{{ t("form.errorBody") }}
				<a :href="`mailto:${PORTFOLIO.email}`" class="text-amber">{{ PORTFOLIO.email }}</a
				>.
				<div v-if="errorDetail" class="mt-2 text-err/85">// {{ errorDetail }}</div>
			</div>
			<button
				type="button"
				class="mt-4 cursor-pointer bg-transparent p-0 font-mono text-xs font-medium leading-none text-gold"
				@click="retry"
			>
				{{ t("form.retry") }}
			</button>
		</div>
	</div>

	<form
		v-else
		novalidate
		class="mt-8 flex max-w-[640px] flex-col gap-[18px] rounded-md border border-border bg-panel p-6"
		@submit="submit"
	>
		<div v-for="k in ['name', 'email', 'message'] as const" :key="k">
			<label
				:for="`cf-${k}`"
				class="mb-1.5 flex items-center justify-between font-mono text-[11px] font-medium lowercase leading-none tracking-wider text-dim"
			>
				<span><span class="text-gold">&gt;</span> {{ t(`form.${k}`) }}</span>
				<span v-if="showErr(k)" class="text-[10px] text-err">// {{ errors[k] }}</span>
			</label>
			<textarea
				v-if="k === 'message'"
				:id="`cf-${k}`"
				v-model="form.message"
				:rows="5"
				:placeholder="t('form.messagePh')"
				class="block min-h-[120px] w-full resize-y rounded border bg-bg px-3 py-2.5 font-mono text-sm font-medium leading-snug text-fg outline-none transition-[border-color,box-shadow] duration-150 focus:border-gold focus:shadow-[0_0_0_3px_rgba(199,167,99,0.12)]"
				:class="showErr(k) ? 'border-err' : 'border-border'"
				@blur="onBlur(k)"
			/>
			<input
				v-else
				:id="`cf-${k}`"
				v-model="form[k]"
				:type="k === 'email' ? 'email' : 'text'"
				:autocomplete="k"
				:placeholder="t(`form.${k}Ph`)"
				class="block w-full rounded border bg-bg px-3 py-2.5 font-mono text-sm font-medium leading-snug text-fg outline-none transition-[border-color,box-shadow] duration-150 focus:border-gold focus:shadow-[0_0_0_3px_rgba(199,167,99,0.12)]"
				:class="showErr(k) ? 'border-err' : 'border-border'"
				@blur="onBlur(k)"
			/>
		</div>

		<div class="@max-[560px]:justify-center flex flex-wrap items-center justify-between gap-3 pt-1">
			<span
				class="@max-[560px]:basis-full @max-[560px]:text-center font-mono text-[11px] font-medium leading-none text-dim"
			>
				<template v-if="status === 'sending'"><span class="text-amber">●</span> {{ t("form.sending") }}</template>
				<template v-else
					><span class="text-tag-daily">●</span> {{ t("form.ready") }} ·
					{{ t("form.chars", { n: form.message.length }) }}</template
				>
			</span>
			<button
				type="submit"
				:disabled="status === 'sending'"
				class="@max-[560px]:px-3.5 @max-[560px]:py-2.5 @max-[560px]:text-xs inline-flex items-center gap-2.5 rounded bg-gold px-5 py-3 font-mono text-[13px] font-semibold uppercase leading-none tracking-wider text-ink transition-[transform,opacity] duration-200 hover:-translate-y-px disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
			>
				{{ t("form.send") }} <TerminalIcon name="send" :size="14" />
			</button>
		</div>
	</form>
</template>
