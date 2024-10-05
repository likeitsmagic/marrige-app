import i18n from "src/i18n";

import { PANELS } from "../../constants";

export const BUSINESS_TABS = [
	{
		id: PANELS.GENERAL_INFORMATION,
		title: i18n.i18n("business", "general_information"),
	},
	{ id: PANELS.LOCATION, title: i18n.i18n("business", "location") },
	{ id: PANELS.IMAGES, title: i18n.i18n("business", "images") },
	{ id: PANELS.SOCIAL_MEDIA, title: i18n.i18n("business", "social_media") },
];
