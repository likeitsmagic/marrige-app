import { FC } from "react";
import { Container } from "@chakra-ui/react";
import { CampaignsList } from "../../features/CampaignsList";

export const HomePage: FC = () => (
    <Container maxW='container.2xl'>
        <CampaignsList />
    </Container>
);
