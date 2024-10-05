import { Play } from "@gravity-ui/icons";
import { ActionBar } from "@gravity-ui/navigation";
import { Button, Icon, Text } from "@gravity-ui/uikit";
import i18n from "src/i18n";

import { useBusiness } from "../../hooks/useBusiness";
import { BusinessStatus } from "../BusinessStatus";

export const BusinessActionBar = () => {
	const { business } = useBusiness();

	return (
		<ActionBar>
			<ActionBar.Section type="primary">
				<ActionBar.Group pull="right">
					<ActionBar.Item>
						<BusinessStatus isReady={!!business?.isReady} />
					</ActionBar.Item>
					<ActionBar.Item>
						<Button>
							<Icon data={Play} />
							<Text>{i18n.i18n("business", "start_button")}</Text>
						</Button>
					</ActionBar.Item>
				</ActionBar.Group>
			</ActionBar.Section>
		</ActionBar>
	);
};
