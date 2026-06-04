import { describe, expect, it } from "vitest";
import { parseRichText } from "./richText";

describe("parseRichText", () => {
	it("returns a single plain segment when there is no markup", () => {
		expect(parseRichText("just text")).toEqual([{ text: "just text", strong: false }]);
	});

	it("splits a single <strong> span with surrounding text", () => {
		expect(parseRichText("a <strong>b</strong> c")).toEqual([
			{ text: "a ", strong: false },
			{ text: "b", strong: true },
			{ text: " c", strong: false },
		]);
	});

	it("handles multiple emphasised spans", () => {
		expect(parseRichText("<strong>x</strong> and <strong>y</strong>!")).toEqual([
			{ text: "x", strong: true },
			{ text: " and ", strong: false },
			{ text: "y", strong: true },
			{ text: "!", strong: false },
		]);
	});

	it("keeps quotes and punctuation inside emphasis intact", () => {
		expect(parseRichText('I am <strong>"Crooser"</strong> Moy')).toEqual([
			{ text: "I am ", strong: false },
			{ text: '"Crooser"', strong: true },
			{ text: " Moy", strong: false },
		]);
	});

	it("does not recognise any tag other than <strong>, leaving it as plain text", () => {
		const segments = parseRichText("safe <script>alert(1)</script> text");
		expect(segments).toEqual([{ text: "safe <script>alert(1)</script> text", strong: false }]);
		// The dangerous markup survives only as inert text — the renderer escapes it.
		expect(segments.every((s) => !s.strong)).toBe(true);
	});

	it("returns an empty array for an empty string", () => {
		expect(parseRichText("")).toEqual([]);
	});
});
