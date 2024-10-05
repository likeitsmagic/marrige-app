import { Label } from "@gravity-ui/uikit";
import { FC } from "react";
import { CampaignStatusEnum } from "src/core/enums/campaignStatus.enum";
import i18n from "src/i18n";

interface BusinessStatusProps {
	status: CampaignStatusEnum;
}

export const BusinessStatus: FC<BusinessStatusProps> = ({ status }) => {
	if (status === CampaignStatusEnum.READY) {
		return <Label theme="utility">{i18n.i18n("business", "is_ready")}</Label>;
	}

	if (status === CampaignStatusEnum.REJECTED) {
		return <Label theme="danger">{i18n.i18n("business", "rejected")}</Label>;
	}

	if (status === CampaignStatusEnum.MODERATION) {
		return <Label theme="info">{i18n.i18n("business", "moderation")}</Label>;
	}

	if (status === CampaignStatusEnum.ACTIVE) {
		return <Label theme="success">{i18n.i18n("business", "active")}</Label>;
	}

	return <Label>{i18n.i18n("business", "draft")}</Label>;
};
