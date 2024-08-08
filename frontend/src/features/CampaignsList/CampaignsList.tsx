import { Skeleton, Wrap } from "@chakra-ui/react";
import { FC } from "react";
import { CampaignCard } from "../../entities/CampaignCard";
import { useCampaignsList } from "./hooks/useCampaignsList";

export const CampaignsList: FC = () => {
    const { campaigns, loading } = useCampaignsList()


    if (loading) {
        return <Wrap>
            <Skeleton height="290px" width="300px" />
            <Skeleton height="290px" width="300px" />
            <Skeleton height="290px" width="300px" />
        </Wrap>
    }

    return (
        <Wrap>
            {campaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
        </Wrap>
    );
};