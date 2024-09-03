import { Chip, Image } from "@nextui-org/react";
import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { BsPeople } from "react-icons/bs";
import { TCampaign } from "../../types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ICampaignPreviewProps {
    campaign: TCampaign;
}

export const CampaignPreview: FC<ICampaignPreviewProps> = ({ campaign }) => {
    const { t } = useTranslation("translation", { keyPrefix: "CampaignPreview" });

    return (
        <Link to={`/campaigns/${campaign.id}`}>
            <div className="w-72 h-80 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-full h-40 relative">
                    <Image width="100%" height={160} src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg" alt={campaign.name} className="w-full h-40 object-cover rounded-t-2xl" />
                    <Chip color="danger" radius="sm" className="absolute top-2 left-2 z-10" classNames={{ content: "font-bold" }}>PRIMARY</Chip>
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-bold">{campaign.name}</h2>
                    <div className="flex items-center">
                        <FaStar color="#FFD700" className="mr-1" />
                        <p className="text-sm font-bold mr-2">{campaign.rating}</p>
                        <p className="text-sm text-gray-500">{campaign.region}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center mt-2">
                            <GrMoney className="mr-1" />
                            <p className="text-sm">{`${t('starting_from')} 0€`}</p>
                        </div>
                        <div className="flex items-center mt-2">
                            <BsPeople className="mr-1" />
                            <p className="text-sm">{`0 ${t('people')}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};