import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ImageContainer } from "src/components/ImageContainer";
import { SignUpFormForIndividual } from "./components/components/SignUpForIndividual";
import { useSearchParams } from "react-router-dom";
import { SignUpFormForBusiness } from "./components/components/SignUpForBusiness";

export const SignUpForm = () => {
	const { t } = useTranslation("translation", { keyPrefix: "SignUpForm" });

	const [selected, setSelected] = useState("individual");

	const [searchParams] = useSearchParams();

	useEffect(() => {
		const businessParam = searchParams.get("business");
		if (businessParam === "true") {
			setSelected("business");
		}
	}, [searchParams]);

	return (
		<ImageContainer>
			<div className="w-full h-full flex flex-col justify-center items-center">
				<Card className="max-w-full w-4/12 min-h-[640px]">
					<CardBody className="p-10">
						<Tabs
							fullWidth
							size="md"
							aria-label="Tabs form"
							selectedKey={selected}
							onSelectionChange={(key) => setSelected(key as string)}
							className="mb-6"
							classNames={{
								tabList: "bg-primary",
								tabContent:
									"group-data-[selected=true]:bg-white group-data-[selected=true]:text-primary text-white",
							}}
							radius="full"
						>
							<Tab key="individual" title={t("individual")}>
								<SignUpFormForIndividual />
							</Tab>
							<Tab key="business" title={t("professional")}>
								<SignUpFormForBusiness />
							</Tab>
						</Tabs>
					</CardBody>
				</Card>
			</div>
		</ImageContainer>
	);
};
