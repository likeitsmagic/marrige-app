import i18n from "src/i18n";

import { WeddingVendorTypeEnum } from "../enums/weddingVendorType.enum";

export const CONTAINER_PADDING = { paddingTop: "16px" };

export const BUSINESS_TYPE_NAMES: Record<WeddingVendorTypeEnum, string> = {
	[WeddingVendorTypeEnum.NONE]: i18n.i18n("wedding_vendor_type", "none"),
	[WeddingVendorTypeEnum.Photographer]: i18n.i18n(
		"wedding_vendor_type",
		"photographer",
	),
	[WeddingVendorTypeEnum.Videographer]: i18n.i18n(
		"wedding_vendor_type",
		"videographer",
	),
	[WeddingVendorTypeEnum.Caterer]: i18n.i18n("wedding_vendor_type", "caterer"),
	[WeddingVendorTypeEnum.Florist]: i18n.i18n("wedding_vendor_type", "florist"),
	[WeddingVendorTypeEnum.DJ]: i18n.i18n("wedding_vendor_type", "dj"),
	[WeddingVendorTypeEnum.Band]: i18n.i18n("wedding_vendor_type", "band"),
	[WeddingVendorTypeEnum.WeddingPlanner]: i18n.i18n(
		"wedding_vendor_type",
		"wedding_planner",
	),
	[WeddingVendorTypeEnum.Venue]: i18n.i18n("wedding_vendor_type", "venue"),
	[WeddingVendorTypeEnum.Baker]: i18n.i18n("wedding_vendor_type", "baker"),
	[WeddingVendorTypeEnum.MakeupArtist]: i18n.i18n(
		"wedding_vendor_type",
		"makeup_artist",
	),
	[WeddingVendorTypeEnum.HairStylist]: i18n.i18n(
		"wedding_vendor_type",
		"hair_stylist",
	),
	[WeddingVendorTypeEnum.Officiant]: i18n.i18n(
		"wedding_vendor_type",
		"officiant",
	),
	[WeddingVendorTypeEnum.Transportation]: i18n.i18n(
		"wedding_vendor_type",
		"transportation",
	),
	[WeddingVendorTypeEnum.Decorator]: i18n.i18n(
		"wedding_vendor_type",
		"decorator",
	),
	[WeddingVendorTypeEnum.BridalShop]: i18n.i18n(
		"wedding_vendor_type",
		"bridal_shop",
	),
};
