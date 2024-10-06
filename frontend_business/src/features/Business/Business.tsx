import { Col, Container, Flex, Row, Skeleton } from "@gravity-ui/uikit";
import { Formik } from "formik";
import { CONTAINER_PADDING } from "src/core/constants";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ReactNode } from "react";

import { BusinessActionBar } from "./components/BusinessActionBar/BusinessActionBar";
import { BusinessTabs } from "./components/BusinessTabs";
import { GeneralInformation } from "./components/GeneralInformation";
import { LocationInfo } from "./components/LoacationInfo";
import { PANELS } from "./constants";
import { useBusiness } from "./hooks/useBusiness";
import { BusinessValues, schema } from "./schema";
import { ImagesInformation } from "./components/ImagesInformation";

const PANELS_COMPONENTS: Record<PANELS, ReactNode> = {
	[PANELS.GENERAL_INFORMATION]: <GeneralInformation />,
	[PANELS.LOCATION]: <LocationInfo />,
	[PANELS.IMAGES]: <ImagesInformation />,
	[PANELS.SOCIAL_MEDIA]: <div>Social Media</div>,
};

export const Business = () => {
	const { isLoading, panel, initialValues, updateBusiness } = useBusiness();

	if (isLoading)
		return (
			<>
				<Skeleton style={{ height: 40, width: "100%" }} />
				<Container style={{ ...CONTAINER_PADDING }} maxWidth="xl">
					<Row space={4}>
						<Col s={12}>
							<Skeleton style={{ height: 36, width: "100%" }} />
						</Col>
						<Col s={12}>
							<Skeleton style={{ height: 400, width: "100%" }} />
						</Col>
					</Row>
				</Container>
			</>
		);

	return (
		<Formik<BusinessValues>
			initialValues={initialValues}
			onSubmit={updateBusiness}
			validationSchema={toFormikValidationSchema(schema)}
			enableReinitialize
		>
			{() => (
				<>
					<BusinessActionBar />
					<Container
						style={{ ...CONTAINER_PADDING, height: "inherit" }}
						maxWidth="xl"
					>
						<Flex direction="column" gap={4}>
							<BusinessTabs />
							{PANELS_COMPONENTS[panel]}
						</Flex>
					</Container>
				</>
			)}
		</Formik>
	);
};
