import { CampaignStatusEnum } from "../enums/campaignStatus.enum";
import { SocialMediaPlatformEnum } from "../enums/socialMediaPlatform.enum";
import { WeddingVendorTypeEnum } from "../enums/weddingVendorType.enum";

export interface ILocation {
	type: "Point";
	coordinates: number[];
}

export interface IUser {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	isConfirmed: boolean;
	authProvider: string;
	avatarUrl: string;
	permissions: string[];
	isBanned: boolean;
	banReason: string;
	createdAt: string;
	updatedAt: string;
}

export interface ISocialMedia {
	platform: SocialMediaPlatformEnum;
	link: string;
}

export interface IBusiness {
	id: string;
	ownerId: string;
	images: string[];
	name: string;
	description: string;
	phone: string;
	location: ILocation;
	address: string;
	minPrice: number;
	maxPrice: number;
	socialMedias: ISocialMedia[];
	type: WeddingVendorTypeEnum;
	createdAt: string;
	updatedAt: string;
	status: CampaignStatusEnum;
}
