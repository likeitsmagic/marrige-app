import { PageConstructor } from "@gravity-ui/page-constructor";
import { FC } from "react";
import { Footer, FooterName } from "src/features/Footer";
import { HeaderConfig } from "src/features/Header";
import {
	UserProfile,
	UserProfileName,
} from "src/features/Header/compoentens/UserProfile";
import { ProfileHeader } from "src/features/Profile/components/ProfileHeader";
import { ProfileHeaderName } from "src/features/Profile/components/ProfileHeader/ProfileHeader";

export const Profile: FC = () => {
	return (
		<PageConstructor
			custom={{
				navigation: {
					[UserProfileName]: UserProfile,
				},
				blocks: {
					[ProfileHeaderName]: ProfileHeader,
					[FooterName]: Footer,
				},
			}}
			navigation={HeaderConfig}
			content={{
				blocks: [{ type: ProfileHeaderName }, { type: FooterName }],
			}}
		/>
	);
};
