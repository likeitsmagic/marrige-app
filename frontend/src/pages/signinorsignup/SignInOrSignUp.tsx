import { Tabs, TabList, Tab, TabPanels, TabPanel, Container, Center } from "@chakra-ui/react";
import { t } from "i18next";
import { FC } from "react";
import { Login } from "../../widgets/login/ui/Login";
import { Register } from "../../widgets/register/ui/Register";

export const SignInOrSignUpPage: FC = () => {
    return <Container >
        <Center> <Tabs variant='soft-rounded' align='center' colorScheme='brand' shadow='md' w='100%' >
            <TabList>
                <Tab>{t("signin")}</Tab>
                <Tab>{t("signup")}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Login />
                </TabPanel>
                <TabPanel>
                    <Register />
                </TabPanel>
            </TabPanels>
        </Tabs>
        </Center>
    </Container>
};