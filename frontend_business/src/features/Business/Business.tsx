import { Container, Flex, Skeleton } from "@gravity-ui/uikit";
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
			<Flex height="100vh" width="100%" direction="column" gap={4}>
				<Skeleton qa="page" style={{ height: 200, width: "100%" }} />
				<Skeleton qa="page" style={{ height: 200, width: "100%" }} />
				<Skeleton qa="page" style={{ height: 200, width: "100%" }} />
			</Flex>
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
					<Container style={{ ...CONTAINER_PADDING, height: "inherit" }}>
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
