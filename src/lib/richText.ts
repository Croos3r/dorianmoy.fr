export type RichTextSegment = { text: string; strong: boolean };

/**
 * Splits a string into plain and `<strong>`-emphasised segments. Only the
 * literal `<strong>…</strong>` pair is recognised; everything else is returned
 * verbatim as plain text (the renderer escapes it), so no other markup can be
 * injected even from untrusted input.
 */
export function parseRichText(text: string): RichTextSegment[] {
	const out: RichTextSegment[] = [];
	const re = /<strong>(.*?)<\/strong>/gs;
	let last = 0;
	let m: RegExpExecArray | null;
	while ((m = re.exec(text))) {
		if (m.index > last) out.push({ text: text.slice(last, m.index), strong: false });
		out.push({ text: m[1], strong: true });
		last = m.index + m[0].length;
	}
	if (last < text.length) out.push({ text: text.slice(last), strong: false });
	return out;
}
