import { afterEach, describe, expect, it, vi } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { defineComponent, ref, type Ref } from "vue";
import { useEditorKeys } from "./useEditorKeys";

type Calls = {
	open: number[];
	resume: number;
	social: number[];
	wq: number;
	wqBang: number;
	qBang: number;
};

let wrapper: VueWrapper | null = null;
let mode: Ref<"NORMAL" | "INSERT">;

function mountKeys(opts: { count?: number; isModalOpen?: () => boolean } = {}) {
	const selIdx = ref(0);
	const calls: Calls = { open: [], resume: 0, social: [], wq: 0, wqBang: 0, qBang: 0 };
	wrapper = mount(
		defineComponent({
			setup() {
				const keys = useEditorKeys({
					itemCount: () => opts.count ?? 4,
					selIdx,
					onOpen: (i) => calls.open.push(i),
					onResume: () => (calls.resume += 1),
					onSocial: (i) => calls.social.push(i),
					isModalOpen: opts.isModalOpen ?? (() => false),
					onWriteQuit: () => (calls.wq += 1),
					onForceWriteQuit: () => (calls.wqBang += 1),
					onForceQuit: () => (calls.qBang += 1),
				});
				mode = keys.mode;
				return () => null;
			},
		}),
	);
	return { selIdx, calls };
}

const press = (key: string) => window.dispatchEvent(new KeyboardEvent("keydown", { key }));

afterEach(() => {
	wrapper?.unmount();
	wrapper = null;
	vi.useRealTimers();
});

describe("useEditorKeys — motions", () => {
	it("moves the selection with j/k and clamps at both ends", () => {
		const { selIdx } = mountKeys({ count: 4 });
		press("j");
		expect(selIdx.value).toBe(1);
		press("j");
		press("j");
		press("j");
		expect(selIdx.value).toBe(3); // clamped at count - 1
		press("k");
		expect(selIdx.value).toBe(2);
		press("k");
		press("k");
		press("k");
		expect(selIdx.value).toBe(0); // clamped at 0
	});

	it("supports arrow keys as aliases for j/k", () => {
		const { selIdx } = mountKeys({ count: 4 });
		press("ArrowDown");
		expect(selIdx.value).toBe(1);
		press("ArrowUp");
		expect(selIdx.value).toBe(0);
	});

	it("jumps to top with g and bottom with G", () => {
		const { selIdx } = mountKeys({ count: 4 });
		press("G");
		expect(selIdx.value).toBe(3);
		press("g");
		expect(selIdx.value).toBe(0);
	});

	it("opens the selected item on Enter", () => {
		const { calls } = mountKeys({ count: 4 });
		press("j");
		press("j");
		press("Enter");
		expect(calls.open).toEqual([2]);
	});
});

describe("useEditorKeys — register marks", () => {
	it('downloads the résumé on "r', () => {
		const { calls } = mountKeys();
		press('"');
		press("r");
		expect(calls.resume).toBe(1);
	});

	it('opens socials on "a and "b', () => {
		const { calls } = mountKeys();
		press('"');
		press("a");
		press('"');
		press("b");
		expect(calls.social).toEqual([0, 1]);
	});

	it('ignores an unmapped register key after "', () => {
		const { calls } = mountKeys();
		press('"');
		press("z");
		expect(calls.resume).toBe(0);
		expect(calls.social).toEqual([]);
	});
});

describe("useEditorKeys — ex commands", () => {
	it("quits to about:blank on q!", () => {
		const { calls } = mountKeys();
		press("q");
		press("!");
		expect(calls.qBang).toBe(1);
	});

	it("shows the readonly warning (E45) on :wq after the grace window", () => {
		vi.useFakeTimers();
		const { calls } = mountKeys();
		press("w");
		press("q");
		expect(calls.wq).toBe(0); // still waiting to see if `!` follows
		vi.advanceTimersByTime(250);
		expect(calls.wq).toBe(1);
		expect(calls.wqBang).toBe(0);
	});

	it("escalates to permission-denied (E212) on :wq! within the grace window", () => {
		vi.useFakeTimers();
		const { calls } = mountKeys();
		press("w");
		press("q");
		press("!");
		expect(calls.wqBang).toBe(1);
		vi.advanceTimersByTime(300);
		expect(calls.wq).toBe(0); // grace timer was cancelled
	});

	it("suppresses :wq arming while a modal is open, but q! still fires", () => {
		vi.useFakeTimers();
		const { calls } = mountKeys({ isModalOpen: () => true });
		press("w");
		press("q");
		vi.advanceTimersByTime(300);
		expect(calls.wq).toBe(0);
		press("q");
		press("!");
		expect(calls.qBang).toBe(1);
	});
});

describe("useEditorKeys — mode tracking", () => {
	it("switches to INSERT when a text field is focused", () => {
		mountKeys();
		expect(mode.value).toBe("NORMAL");
		const input = document.createElement("input");
		document.body.appendChild(input);
		input.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
		expect(mode.value).toBe("INSERT");
		input.remove();
	});
});
