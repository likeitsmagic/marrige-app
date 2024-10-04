import { PageConstructor } from "@gravity-ui/page-constructor";
import { FC } from "react";
import { CampaignList, CampaignListName } from "src/features/CampaignList";
import { Footer, FooterName } from "src/features/Footer";
import { HeaderConfig } from "src/features/Header";
import {
	UserProfile,
	UserProfileName,
} from "src/features/Header/components/UserProfile";
import { Searcher, SearcherName } from "src/features/Searcher";

export const Home: FC = () => {
	return (
		<PageConstructor
			custom={{
				navigation: {
					[UserProfileName]: UserProfile,
				},
				blocks: {
					[SearcherName]: Searcher,
					[CampaignListName]: CampaignList,
					[FooterName]: Footer,
				},
			}}
			navigation={HeaderConfig}
			content={{
				blocks: [
					{
						type: SearcherName,
					},
					{
						type: CampaignListName,
					},
					{ type: FooterName },
				],
			}}
		/>
	);
};
