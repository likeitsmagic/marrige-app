import { Col, Container, Flex, Row, Skeleton } from "@gravity-ui/uikit";
import { Formik } from "formik";
import { CONTAINER_PADDING } from "src/core/constants";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { BusinessActionBar } from "./components/BusinessActionBar/BusinessActionBar";
import { BusinessTabs } from "./components/BusinessTabs";
import { GeneralInformation } from "./components/GeneralInformation";
import { PANELS } from "./constants";
import { useBusiness } from "./hooks/useBusiness";
import { BusinessValues, schema } from "./schema";

export const Business = () => {
	const { isLoading, panel, initialValues, updateBusiness } = useBusiness();

	if (isLoading)
		return (
			<>
				<Skeleton qa="actionbar" style={{ height: 40, width: "100%" }} />
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
							{panel === PANELS.GENERAL_INFORMATION && <GeneralInformation />}
						</Flex>
					</Container>
				</>
			)}
		</Formik>
	);
};
