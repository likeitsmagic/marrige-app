import { FC } from "react";
import { useCampaignsList } from "./hooks/useCampaignList";
import { Skeleton } from "@nextui-org/react";
import { CampaignPreview } from "./components/CampaignPreview";
import { useTranslation } from "react-i18next";

export const CampaignList: FC = () => {
	const { t } = useTranslation("translation", { keyPrefix: "CampaignList" });

	const { campaigns, isLoading } = useCampaignsList();

	if (isLoading) {
		return (
			<div className="max-w-screen-2xl bg-white">
				<div className="max-w-screen-xl mx-auto my-16 p-6">
					<h2 className="text-4xl text-primary font-bold mb-4">{t("title")}</h2>
					<div className="flex items-center gap-4">
						<Skeleton className="w-64 h-80 rounded-2xl shadow-md" />
						<Skeleton className="w-64 h-80 rounded-2xl shadow-md" />
						<Skeleton className="w-64 h-80 rounded-2xl shadow-md" />
						<Skeleton className="w-64 h-80 rounded-2xl shadow-md" />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-screen-2xl bg-white">
			<div className="max-w-screen-xl mx-auto my-16 p-6">
				<h2 className="text-4xl text-primary font-bold mb-4">{t("title")}</h2>
				<div className="flex items-center gap-4">
					{campaigns.map((campaign) => (
						<CampaignPreview key={campaign.id} campaign={campaign} />
					))}
				</div>
			</div>
		</div>
	);
};
