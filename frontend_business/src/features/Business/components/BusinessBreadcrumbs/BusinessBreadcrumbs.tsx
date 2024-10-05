import {
	Breadcrumbs,
	FirstDisplayedItemsCount,
	LastDisplayedItemsCount,
} from "@gravity-ui/uikit";
import { noop } from "lodash";
import { useMemo } from "react";
import i18n from "src/i18n";

import { PANELS } from "../../constants";
import { useBusiness } from "../../hooks/useBusiness";

export const BusinessBreadcrumbs = () => {
	const { business, panel } = useBusiness();

	const lastBreadcrumbItem = useMemo(() => {
		switch (panel) {
			case PANELS.GENERAL_INFORMATION:
				return {
					text: i18n.i18n("business", "general_information"),
					action: noop,
				};
			case PANELS.LOCATION:
				return {
					text: i18n.i18n("business", "location"),
					action: noop,
				};
			case PANELS.IMAGES:
				return {
					text: i18n.i18n("business", "images"),
					action: noop,
				};
			case PANELS.SOCIAL_MEDIA:
				return {
					text: i18n.i18n("business", "social_media"),
					action: noop,
				};
		}
	}, [panel]);

	if (!business) {
		return null;
	}

	return (
		<Breadcrumbs
			items={[
				{
					text: i18n.i18n("application", "title"),
					action: noop,
				},
				{
					text: i18n.i18n("business", "business"),
					action: noop,
				},
				lastBreadcrumbItem,
			]}
			firstDisplayedItemsCount={FirstDisplayedItemsCount.One}
			lastDisplayedItemsCount={LastDisplayedItemsCount.Two}
		/>
	);
};
