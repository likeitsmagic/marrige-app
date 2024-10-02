import { Button, Spinner } from "@nextui-org/react";
import { TbBrandCampaignmonitor } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { useNavigate } from "react-router";

import { useMyCampaign } from "./hooks/useMyCampaign";

export const Campaign = () => {
	const { t } = useTranslation("translation", { keyPrefix: "Campaign" });
	const navigate = useNavigate();

	const { data, isLoading } = useMyCampaign();

	const handleCreateCampaign = useCallback(() => {
		navigate("/create-campaign");
	}, [navigate]);

	if (isLoading)
		return (
			<div className="flex justify-center items-center w-screen py-20">
				<Spinner size="lg" />
			</div>
		);

	if (!data?.data) {
		return (
			<div className="flex flex-col justify-center items-center w-screen py-20 gap-4">
				<TbBrandCampaignmonitor size={100} />
				<p className="text-2xl">{t("you_dont_have_a_campaign_yet")}</p>
				<Button color="primary" onClick={handleCreateCampaign}>
					{t("create_a_campaign")}
				</Button>
			</div>
		);
	}

	return <div>{JSON.stringify(data?.data)}</div>;
};
