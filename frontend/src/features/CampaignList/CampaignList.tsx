import { FC } from "react";
import { Skeleton, Text } from "@gravity-ui/uikit";
import { SliderBlock } from "@gravity-ui/page-constructor";
import i18n from "src/i18n";

import { CampaignPreview } from "./components/CampaignPreview";
import { useCampaignsList } from "./hooks/useCampaignList";

export const CampaignList: FC = () => {
	const { campaigns, isLoading } = useCampaignsList();

	if (isLoading) {
		return <Skeleton />;
	}

	if (campaigns.length === 0) {
		return <Text>No campaigns found</Text>;
	}

	return (
		<SliderBlock
			title={{
				text: i18n.i18n("campaigns", "favorite_partners"),
			}}
			lazyLoad
			slidesToShow={{
				sm: 1,
				md: 2,
				lg: 3,
				xl: 4,
			}}
		>
			{campaigns.map((campaign) => (
				<CampaignPreview key={campaign.id} campaign={campaign} />
			))}
		</SliderBlock>
	);
};

export const CampaignListName = "campaign-list";
