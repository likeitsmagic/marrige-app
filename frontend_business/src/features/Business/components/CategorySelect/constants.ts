import { BUSINESS_TYPE_NAMES } from "src/core/constants";
import { WeddingVendorTypeEnum } from "src/core/enums/weddingVendorType.enum";

export const CATEGORY_SELECT_OPTIONS = [
	{
		value: WeddingVendorTypeEnum.NONE,
		label: BUSINESS_TYPE_NAMES[WeddingVendorTypeEnum.NONE],
	},
	{
		value: WeddingVendorTypeEnum.Baker,
		label: BUSINESS_TYPE_NAMES[WeddingVendorTypeEnum.Baker],
	},
	{
		value: WeddingVendorTypeEnum.Band,
		label: BUSINESS_TYPE_NAMES[WeddingVendorTypeEnum.Band],
	},
	{
		value: WeddingVendorTypeEnum.BridalShop,
		label: BUSINESS_TYPE_NAMES[WeddingVendorTypeEnum.BridalShop],
	},
	{
		value: WeddingVendorTypeEnum.Caterer,
		label: BUSINESS_TYPE_NAMES[WeddingVendorTypeEnum.Caterer],
	},
	{
		value: WeddingVendorTypeEnum.Decorator,
		label: BUSINESS_TYPE_NAMES[WeddingVendorTypeEnum.Decorator],
	},
	{
		value: WeddingVendorTypeEnum.DJ,
		label: BUSINESS_TYPE_NAMES[WeddingVendorTypeEnum.DJ],
	},
	{
		value: WeddingVendorTypeEnum.Florist,
		label: BUSINESS_TYPE_NAMES[WeddingVendorTypeEnum.Florist],
	},
	{
		value: WeddingVendorTypeEnum.HairStylist,
		label: BUSINESS_TYPE_NAMES[WeddingVendorTypeEnum.HairStylist],
	},
	{
		value: WeddingVendorTypeEnum.MakeupArtist,
		label: BUSINESS_TYPE_NAMES[WeddingVendorTypeEnum.MakeupArtist],
	},
	{
		value: WeddingVendorTypeEnum.Officiant,
		label: BUSINESS_TYPE_NAMES[WeddingVendorTypeEnum.Officiant],
	},
	{
		value: WeddingVendorTypeEnum.Photographer,
		label: BUSINESS_TYPE_NAMES[WeddingVendorTypeEnum.Photographer],
	},
	{
		value: WeddingVendorTypeEnum.Transportation,
		label: BUSINESS_TYPE_NAMES[WeddingVendorTypeEnum.Transportation],
	},
	{
		value: WeddingVendorTypeEnum.Venue,
		label: BUSINESS_TYPE_NAMES[WeddingVendorTypeEnum.Venue],
	},
	{
		value: WeddingVendorTypeEnum.Videographer,
		label: BUSINESS_TYPE_NAMES[WeddingVendorTypeEnum.Videographer],
	},
	{
		value: WeddingVendorTypeEnum.WeddingPlanner,
		label: BUSINESS_TYPE_NAMES[WeddingVendorTypeEnum.WeddingPlanner],
	},
];
