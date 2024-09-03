import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ImageContainer } from "src/components/ImageContainer";
import { SignInFormForIndividual } from "./components/SignInForIndividual";

export const SignInForm = () => {
    const { t } = useTranslation("translation", { keyPrefix: "SignInForm" });

    const [selected, setSelected] = useState("signin");

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
                            onSelectionChange={(key) => setSelected(key as string)}
                            className="mb-6"
                            classNames={{
                                tabList: "bg-primary",
                                tabContent: "group-data-[selected=true]:bg-white group-data-[selected=true]:text-primary text-white",
                            }}
                            radius="full"
                        >
                            <Tab key="signin" title={t('individual')} >
                                <SignInFormForIndividual />
                            </Tab>
                            <Tab key="signup" title={t('professional')} >

                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </ImageContainer>
    );
}