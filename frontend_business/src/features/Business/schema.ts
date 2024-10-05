import { SocialMediaPlatformEnum } from "src/core/enums/socialMediaPlatform.enum";
import { WeddingVendorTypeEnum } from "src/core/enums/weddingVendorType.enum";
import { z } from "zod";

export const schema = z.object({
	name: z.string().min(1).max(70),
	description: z.string().max(600),
	phone: z.string().optional(),
	type: z.nativeEnum(WeddingVendorTypeEnum),
	address: z.string(),
	location: z.object({
		type: z.literal("Point"),
		coordinates: z.array(z.number()),
	}),
	minPrice: z.number(),
	maxPrice: z.number(),
	socialMedias: z.array(
		z.object({
			platform: z.nativeEnum(SocialMediaPlatformEnum),
			link: z.string().url(),
		}),
	),
});

export type BusinessValues = z.infer<typeof schema>;
