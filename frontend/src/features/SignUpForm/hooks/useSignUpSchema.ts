import { t } from "i18next";
import { z } from "zod";

export const useSignUpSchema = (isBusiness: boolean) => {
	return z
		.object({
			email: z
				.string({ message: t("Validation.field_is_required") })
				.email({ message: t("Validation.invalid_email") }),
			password: z
				.string({ message: t("Validation.field_is_required") })
				.min(6, {
					message: t("Validation.password_must_be_at_least_6_characters"),
				})
				.max(20, {
					message: t("Validation.password_must_be_at_most_20_characters"),
				}),
			confirmPassword: z.string({ message: t("Validation.field_is_required") }),
			location: !isBusiness
				? z.object(
						{
							type: z.literal("Point"),
							coordinates: z.array(z.number()),
						},
						{ message: t("Validation.field_is_required") },
					)
				: z.any().nullable().optional(),
		})
		.superRefine((data, ctx) => {
			if (data.password !== data.confirmPassword) {
				return ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: t("Validation.passwords_must_match"),
					path: ["confirmPassword"],
				});
			}
		});
};
