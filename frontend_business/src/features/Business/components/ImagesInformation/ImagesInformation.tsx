import { useFormikContext } from "formik";
import { Card, Container } from "@gravity-ui/uikit";
import { CONTAINER_PADDING } from "src/core/constants";

import { BusinessValues } from "../../schema";

export const ImagesInformation = () => {
	const { values } = useFormikContext<BusinessValues>();

	return (
		<Card>
			<Container style={CONTAINER_PADDING}>
				{values.images.map((image, index) => (
					<img src={image} alt={`Image ${index}`} />
				))}
			</Container>
		</Card>
	);
};
