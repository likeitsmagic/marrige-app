import { Container, Divider, Flex, Skeleton } from "@gravity-ui/uikit";
import { Formik } from "formik";
import { noop } from "lodash";
import { CONTAINER_PADDING } from "src/core/constants";

import { BusinessActionBar } from "./components/BusinessActionBar/BusinessActionBar";
import { BusinessHeader } from "./components/BusinessHeader";
import { BusinessTabs } from "./components/BusinessTabs";
import { useBusiness } from "./hooks/useBusiness";
import { useEditBusiness } from "./hooks/useEditBusiness";
import { BusinessValues } from "./schema";

export const Business = () => {
	const { isLoading } = useBusiness();

	const { initialValues } = useEditBusiness();

	if (isLoading)
		return (
			<Flex height="100vh" width="100%" direction="column" gap={4}>
				<Skeleton qa="page" style={{ height: 200, width: "100%" }} />
				<Skeleton qa="page" style={{ height: 200, width: "100%" }} />
				<Skeleton qa="page" style={{ height: 200, width: "100%" }} />
			</Flex>
		);

	return (
		<>
			<BusinessActionBar />
			<Container style={{ ...CONTAINER_PADDING, height: "inherit" }}>
				<Flex direction="column" gap={4}>
					<BusinessHeader />
					<Divider />
					<Formik<BusinessValues> initialValues={initialValues} onSubmit={noop}>
						{() => (
							<>
								<BusinessTabs />
							</>
						)}
					</Formik>
				</Flex>
			</Container>
		</>
	);
};
