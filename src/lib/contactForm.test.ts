import { describe, expect, it } from "vitest";
import { validateContact, type ContactFields } from "./contactForm";

const valid: ContactFields = {
	name: "Ada Lovelace",
	email: "ada@example.com",
	message: "Hello, I would like to discuss a project with you.",
};

describe("validateContact", () => {
	it("returns no errors for a valid form", () => {
		expect(validateContact(valid)).toEqual({});
	});

	it("flags every empty field as required", () => {
		expect(validateContact({ name: "", email: "", message: "" })).toEqual({
			name: "required",
			email: "required",
			message: "required",
		});
	});

	it("treats whitespace-only fields as empty", () => {
		expect(validateContact({ name: "   ", email: "  ", message: "\t\n" })).toEqual({
			name: "required",
			email: "required",
			message: "required",
		});
	});

	it("rejects a malformed email", () => {
		expect(validateContact({ ...valid, email: "not-an-email" }).email).toBe("invalidEmail");
		expect(validateContact({ ...valid, email: "a@b" }).email).toBe("invalidEmail");
		expect(validateContact({ ...valid, email: "a @b.com" }).email).toBe("invalidEmail");
	});

	it("accepts a well-formed email", () => {
		expect(validateContact({ ...valid, email: "first.last@sub.domain.co" }).email).toBeUndefined();
	});

	it("rejects a message shorter than the minimum (after trimming)", () => {
		expect(validateContact({ ...valid, message: "too short" }).message).toBe("tooShort");
		expect(validateContact({ ...valid, message: "         a         " }).message).toBe("tooShort");
	});

	it("accepts a message at the minimum length", () => {
		expect(validateContact({ ...valid, message: "0123456789" }).message).toBeUndefined();
	});
});
