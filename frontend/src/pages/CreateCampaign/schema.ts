import { t } from "i18next";
import { z } from "zod";

export const schema = z
	.object({
		name: z
			.string({ message: t("Validation.field_is_required") })
			.min(1, { message: t("Validation.min_length", { length: 1 }) })
			.max(255, { message: t("Validation.max_length", { length: 255 }) }),

		phone: z
			.string({ message: t("Validation.field_is_required") })
			.refine((val) => /^(\+7|7|8)?[\d]{10}$/.test(val), {
				message: t("Validation.invalid_phone_number"),
			}),

		location: z
			.object({
				type: z.literal("Point"),
				coordinates: z.tuple([z.number(), z.number()]),
			})
			.nullable()
			.optional(),

		advantages: z.array(z.string().uuid()),
	})
	.superRefine((data, ctx) => {
		if (data.location === undefined) {
			return ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: t("Validation.field_is_required"),
				path: ["location"],
			});
		}
	});


export type CreateCampaignSchema = z.infer<typeof schema>;
