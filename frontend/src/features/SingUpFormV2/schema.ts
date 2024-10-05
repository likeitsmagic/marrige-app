import i18n from "src/i18n";
import { z } from "zod";

export const schema = z
	.object({
		email: z
			.string({ message: i18n.i18n("validation", "field_is_required") })
			.email({ message: i18n.i18n("validation", "invalid_email") }),
		password: z
			.string({ message: i18n.i18n("validation", "field_is_required") })
			.min(6, {
				message: i18n.i18n(
					"validation",
					"password_must_be_at_least_6_characters",
				),
			})
			.max(20, {
				message: i18n.i18n(
					"validation",
					"password_must_be_at_most_20_characters",
				),
			}),
		confirmPassword: z.string({
			message: i18n.i18n("validation", "field_is_required"),
		}),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			return ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: i18n.i18n("validation", "passwords_must_match"),
				path: ["confirmPassword"],
			});
		}
	});

export type SignUpValues = z.infer<typeof schema>;
