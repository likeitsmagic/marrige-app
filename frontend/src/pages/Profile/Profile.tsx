import { PageConstructor } from "@gravity-ui/page-constructor";
import { FC } from "react";
import { Footer, FooterName } from "src/features/Footer";
import { HeaderConfig } from "src/features/Header";
import {
	UserProfile,
	UserProfileName,
} from "src/features/Header/components/UserProfile";
import {
	ProfileName,
	Profile as ProfileComponent,
} from "src/features/Profile/Profile";

export const Profile: FC = () => {
	return (
		<PageConstructor
			custom={{
				navigation: {
					[UserProfileName]: UserProfile,
				},
				blocks: {
					[ProfileName]: ProfileComponent,
					[FooterName]: Footer,
				},
			}}
			navigation={HeaderConfig}
			content={{
				blocks: [{ type: ProfileName }, { type: FooterName }],
			}}
		/>
	);
};
