import { useQuery } from "@tanstack/react-query";

import { CampaignApi } from "../api/Campaign.api";

export const useMyCampaign = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["myCampaign"],
		queryFn: CampaignApi.getMyCampaign,
	});

	return { data, isLoading };
};
