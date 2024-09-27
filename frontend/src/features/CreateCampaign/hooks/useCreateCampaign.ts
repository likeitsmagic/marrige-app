import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateCampaignApi } from "../api/CreateCampaign.api";
import { CreateCampaignSchema } from "../schema";
import { useCallback } from "react";
import { useNavigate } from "react-router";

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
		[mutate],
	);

	return { advantages, isLoadingAdvantages, createCampaign };
};
