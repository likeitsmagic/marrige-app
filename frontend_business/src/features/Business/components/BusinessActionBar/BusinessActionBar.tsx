import { PencilToSquare, Play } from "@gravity-ui/icons";
import { ActionBar } from "@gravity-ui/navigation";
import { Button, Icon, Text } from "@gravity-ui/uikit";
import { CampaignStatusEnum } from "src/core/enums/campaignStatus.enum";
import i18n from "src/i18n";
import { useFormikContext } from "formik";
import { FC, useCallback } from "react";

import { useBusiness } from "../../hooks/useBusiness";
import { BusinessValues } from "../../schema";
import { BusinessBreadcrumbs } from "../BusinessBreadcrumbs";
import { BusinessStatus } from "../BusinessStatus";

export const BusinessActionBar: FC = () => {
	const { handleSubmit, isSubmitting } = useFormikContext<BusinessValues>();
	const { business } = useBusiness();

	const handleSave = useCallback(async () => {
		await handleSubmit();
	}, [handleSubmit]);

	if (!business) {
		return null;
	}

	return (
		<ActionBar>
			<ActionBar.Section type="secondary">
				<ActionBar.Group pull="left">
					<ActionBar.Item>
						<BusinessBreadcrumbs />
					</ActionBar.Item>
				</ActionBar.Group>
			</ActionBar.Section>
			<ActionBar.Section type="primary">
				<ActionBar.Group pull="right">
					<ActionBar.Item>
						<BusinessStatus status={business.status} />
					</ActionBar.Item>
					<ActionBar.Item>
						<Button
							view="outlined-success"
							onClick={handleSave}
							loading={isSubmitting}
						>
							<Icon data={PencilToSquare} />
							<Text>{i18n.i18n("common", "save")}</Text>
						</Button>
					</ActionBar.Item>
					<ActionBar.Item>
						<Button disabled={business.status === CampaignStatusEnum.DRAFT}>
							<Icon data={Play} />
							<Text>{i18n.i18n("business", "start_button")}</Text>
						</Button>
					</ActionBar.Item>
				</ActionBar.Group>
			</ActionBar.Section>
		</ActionBar>
	);
};
