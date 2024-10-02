import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useNavigate } from "react-router";

import { CreateCampaignApi } from "../api/CreateCampaign.api";
import { CreateCampaignSchema } from "../schema";

export const useCreateCampaign = () => {
	const navigate = useNavigate();

	const { data: advantages, isLoading: isLoadingAdvantages } = useQuery({
		queryKey: ["advantages"],
		queryFn: CreateCampaignApi.getAdvantages,
	});

	const { mutate } = useMutation({
		mutationFn: CreateCampaignApi.createCampaign,
	});

	const createCampaign = useCallback(
		async (values: CreateCampaignSchema) => {
			await mutate(values, {
				onSuccess: (data) => {
					navigate(`/campaign/${data.data.id}`);
				},
			});
		},
		[mutate, navigate],
	);

	return { advantages, isLoadingAdvantages, createCampaign };
};
