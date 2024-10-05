import { PencilToSquare } from "@gravity-ui/icons";
import {
	Breadcrumbs,
	Button,
	FirstDisplayedItemsCount,
	Flex,
	Icon,
	LastDisplayedItemsCount,
	Text,
} from "@gravity-ui/uikit";
import { noop } from "lodash";
import { useMemo } from "react";
import i18n from "src/i18n";

import { useBusiness } from "../../hooks/useBusiness";
import { BusinessStatus } from "../BusinessStatus";
import { PANELS } from "../../constants";

export const BusinessHeader = () => {
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
		<Flex width="100%" justifyContent="space-between" alignItems="start">
			<Flex direction="column" gap={2}>
				<Flex alignItems="center" gap={2}>
					<Text variant="header-1">{i18n.i18n("business", "business")}</Text>
					<BusinessStatus status={business.status} />
				</Flex>
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
			</Flex>
			<Button view="action" size="l">
				<Icon data={PencilToSquare} />
				<Text>{i18n.i18n("common", "save")}</Text>
			</Button>
		</Flex>
	);
};
