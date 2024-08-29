"use client";

import { ImageContainer } from "@/components/ImageContainer";
import { Button, Card, CardBody, Input, Link, Tab, Tabs } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const SignInSignUpForm = () => {
    const t = useTranslations('SignInSignUpForm');

    const [selected, setSelected] = useState("signin");

    return (
        <ImageContainer>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <Card className="max-w-full w-1/2 h-auto">
                    <CardBody className="p-8">
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
                            <Tab key="signin" title={t('signin')} >
                                <form className="flex flex-col gap-4">
                                    <h2 className="text-center text-xl font-semibold">{t('signin_title')}</h2>
                                    <p className="text-center text-sm text-gray-500">
                                        {t('no_account')}{" "}
                                        <Link size="sm" onPress={() => setSelected("sign-up")}>
                                            {t('signup')}
                                        </Link>
                                    </p>
                                    <Input isRequired label={t('email_label')} placeholder={t('email_placeholder')} type="email" />
                                    <Input isRequired label={t('password_label')} placeholder={t('password_placeholder')} type="password" />
                                    <Link size="sm" className="text-right text-sm text-gray-500">
                                        {t('forgot_password')}
                                    </Link>
                                    <Button fullWidth color="primary" className="mt-4">
                                        {t('signin')}
                                    </Button>
                                </form>
                            </Tab>
                            <Tab key="signup" title={t('signup')} >
                                <form className="flex flex-col gap-4">
                                    <h2 className="text-center text-xl font-semibold">{t('signup_title')}</h2>
                                    <Input isRequired label={t('name_label')} placeholder={t('name_placeholder')} type="text" />
                                    <Input isRequired label={t('email_label')} placeholder={t('email_placeholder')} type="email" />
                                    <Input isRequired label={t('password_label')} placeholder={t('password_placeholder')} type="password" />
                                    <Button fullWidth color="primary" className="mt-4">
                                        {t('signup')}
                                    </Button>
                                </form>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </ImageContainer>
    );
}