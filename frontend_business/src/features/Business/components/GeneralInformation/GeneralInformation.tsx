import { Card, Container, Disclosure, Text } from "@gravity-ui/uikit";
import { CONTAINER_PADDING } from "src/core/constants";
import i18n from "src/i18n";

export const GeneralInformation = () => {
	return (
		<Card view="filled">
			<Container style={CONTAINER_PADDING}>
				<Disclosure summary={i18n.i18n("business", "general_information")}>
					<Text>
						{i18n.i18n("business", "general_information_description")}
					</Text>
				</Disclosure>
			</Container>
		</Card>
	);
};
