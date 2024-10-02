import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { Key, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ImageContainer } from "src/components/ImageContainer";
import { useSearchParams } from "react-router-dom";

import { SignInFormForIndividual } from "./components/SignInForIndividual";
import { SignInFormForBusiness } from "./components/SignInForBusiness";

export const SignInForm = () => {
	const { t } = useTranslation("translation", { keyPrefix: "SignInForm" });

	const [selected, setSelected] = useState("individual");

	const [searchParams] = useSearchParams();

	useEffect(() => {
		const businessParam = searchParams.get("business");
		if (businessParam === "true") {
			setSelected("business");
		}
	}, [searchParams]);

	const handleTabChange = useCallback(
		(key: Key) => {
			if (typeof key === "string") {
				setSelected(key);
			}
		},
		[setSelected],
	);

	return (
		<ImageContainer>
			<div className="w-full h-full flex flex-col justify-center items-center">
				<Card className="max-w-full w-4/12 h-auto">
					<CardBody className="p-10">
						<Tabs
							fullWidth
							size="md"
							aria-label="Tabs form"
							selectedKey={selected}
							onSelectionChange={handleTabChange}
							className="mb-6"
							classNames={{
								tabList: "bg-primary",
								tabContent:
									"group-data-[selected=true]:bg-white group-data-[selected=true]:text-primary text-white",
							}}
							radius="full"
						>
							<Tab key="individual" title={t("individual")}>
								<SignInFormForIndividual />
							</Tab>
							<Tab key="business" title={t("professional")}>
								<SignInFormForBusiness />
							</Tab>
						</Tabs>
					</CardBody>
				</Card>
			</div>
		</ImageContainer>
	);
};
