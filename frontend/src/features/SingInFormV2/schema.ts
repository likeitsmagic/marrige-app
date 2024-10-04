import i18n from "src/i18n";
import { z } from "zod";

export const SignInSchema = z.object({
	email: z
		.string({ message: i18n.i18n("validation", "field_is_required") })
		.email({ message: i18n.i18n("validation", "invalid_email") }),
	password: z.string({ message: i18n.i18n("validation", "field_is_required") }),
});

export type SignInValues = z.infer<typeof SignInSchema>;
