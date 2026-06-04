export type ContactFields = {
	name: string;
	email: string;
	message: string;
};

/** i18n suffix under `form.*` describing why a field is invalid. */
export type ContactErrorCode = "required" | "invalidEmail" | "tooShort";

export type ContactErrors = Partial<Record<keyof ContactFields, ContactErrorCode>>;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_MESSAGE_LENGTH = 10;

/**
 * Validates the contact form, returning a map of field → error code for every
 * invalid field. Pure and i18n-agnostic: callers translate the codes via
 * `t('form.' + code)`. An empty object means the form is valid.
 */
export function validateContact(form: ContactFields): ContactErrors {
	const errors: ContactErrors = {};
	if (!form.name.trim()) errors.name = "required";
	if (!form.email.trim()) errors.email = "required";
	else if (!EMAIL_RE.test(form.email)) errors.email = "invalidEmail";
	if (!form.message.trim()) errors.message = "required";
	else if (form.message.trim().length < MIN_MESSAGE_LENGTH) errors.message = "tooShort";
	return errors;
}
