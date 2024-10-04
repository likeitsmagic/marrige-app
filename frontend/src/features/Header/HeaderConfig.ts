import {
	NavigationData,
	NavigationItemType,
} from "@gravity-ui/page-constructor";
import i18n from "src/i18n";

import { UserProfileName } from "./components/UserProfile";

export const HeaderConfig: NavigationData = {
	logo: {
		icon: "",
		alt: "logo",
		text: "Toi & Moi",
	},
	header: {
		leftItems: [
			{
				type: NavigationItemType.Link,
				text: i18n.i18n("header", "our_day"),
				url: "/",
			},
			{
				type: NavigationItemType.Link,
				text: i18n.i18n("header", "place"),
				url: "/",
			},
			{
				type: NavigationItemType.Link,
				text: i18n.i18n("header", "contractor"),
				url: "/",
			},
			{
				type: NavigationItemType.Link,
				text: i18n.i18n("header", "for_groom_and_bride"),
				url: "/",
			},
		],
		rightItems: [
			{
				// @ts-expect-error Косяк в либе
				type: UserProfileName,
			},
		],
		withBorderOnScroll: true,
	},
};
