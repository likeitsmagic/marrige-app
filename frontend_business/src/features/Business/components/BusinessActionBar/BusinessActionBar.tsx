import { Play } from "@gravity-ui/icons";
import { ActionBar } from "@gravity-ui/navigation";
import { Button, Icon, Text } from "@gravity-ui/uikit";
import i18n from "src/i18n";
import { CampaignStatusEnum } from "src/core/enums/campaignStatus.enum";

import { useBusiness } from "../../hooks/useBusiness";

export const BusinessActionBar = () => {
	const { business } = useBusiness();

	if (!business) {
		return null;
	}

	return (
		<ActionBar>
			<ActionBar.Section type="secondary">
				<ActionBar.Group></ActionBar.Group>
			</ActionBar.Section>
			<ActionBar.Section type="primary">
				<ActionBar.Group pull="right">
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
