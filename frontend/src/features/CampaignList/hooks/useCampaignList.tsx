import { useCallback, useEffect, useState } from "react";
import { TCampaign } from "../types";
import axiosInstance from "src/core/api/axios";

export const useCampaignsList = () => {
	const [campaigns, setCampaigns] = useState<TCampaign[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const getCampaigns = useCallback(async () => {
		try {
			setIsLoading(true);
			const { data } = await axiosInstance.get<TCampaign[]>("/campaigns");
			setCampaigns(data);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		getCampaigns();
	}, [getCampaigns]);

	return { campaigns, isLoading };
};
