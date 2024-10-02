import { Image } from "@nextui-org/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BsPeople } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { Link } from "react-router-dom";

import { TCampaign } from "../../types";

interface ICampaignPreviewProps {
	campaign: TCampaign;
}

export const CampaignPreview: FC<ICampaignPreviewProps> = ({ campaign }) => {
	const { t } = useTranslation("translation", { keyPrefix: "CampaignPreview" });

	return (
		<Link to={`/campaigns/${campaign.id}`}>
			<div className="w-56 h-[340px] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 relative">
				<div>
					<Image
						src={campaign.images?.[0]}
						alt={campaign.name}
						fallbackSrc="https://via.placeholder.com/300x200"
						className="w-full h-[250px] object-cover object-center"
					/>
				</div>
				<div className="p-4 rounded-lg absolute left-0 right-0 bottom-0 bg-white">
					<h2 className="text-lg font-bold">{campaign.name}</h2>
					<div className="flex items-center">
						<FaStar color="#FFD700" className="mr-1" />
						<p className="text-sm font-bold mr-2">{campaign.rating}</p>
						<p className="text-sm text-gray-500">{campaign.region}</p>
					</div>
					<div className="flex items-center gap-3">
						<div className="flex items-center mt-2">
							<GrMoney className="mr-1" />
							<p className="text-sm">{`${t("starting_from")} 0€`}</p>
						</div>
						<div className="flex items-center mt-2">
							<BsPeople className="mr-1" />
							<p className="text-sm">{`0 ${t("people")}`}</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};
