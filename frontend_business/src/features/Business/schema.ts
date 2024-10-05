import { SocialMediaPlatformEnum } from "src/core/enums/socialMediaPlatform.enum";
import { WeddingVendorTypeEnum } from "src/core/enums/weddingVendorType.enum";
import { z } from "zod";

export const schema = z
	.object({
		name: z.string().min(1).max(70),
		description: z.string().max(600).optional(),
		phone: z.string().optional(),
		type: z.nativeEnum(WeddingVendorTypeEnum).superRefine((value, ctx) => {
			if (value === WeddingVendorTypeEnum.NONE) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Type cannot be NONE",
				});
			}
		}),
		address: z.string().optional(),
		location: z.object({
			type: z.literal("Point"),
			coordinates: z.array(z.number()),
		}),
		minPrice: z.number().max(9999999999),
		maxPrice: z.number().max(9999999999),
		socialMedias: z.array(
			z.object({
				platform: z.nativeEnum(SocialMediaPlatformEnum),
				link: z.string().url(),
			}),
		),
	})
	.partial()
	.superRefine((value, ctx) => {
		if (value.minPrice && value.maxPrice && value.minPrice > value.maxPrice) {
			ctx.addIssue({
				path: ["minPrice"],
				code: z.ZodIssueCode.custom,
				message: "Min price cannot be greater than max price",
			});
		}
	});

export type BusinessValues = z.infer<typeof schema>;
