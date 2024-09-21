import { t } from "i18next";
import { z } from "zod";

export const SignInSchema = z.object({
	email: z
		.string({ message: t("Validation.field_is_required") })
		.email({ message: t("Validation.invalid_email") }),
	password: z.string({ message: t("Validation.field_is_required") }),
});
