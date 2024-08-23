import { FC } from "react";
import { Container } from "@chakra-ui/react";
import { CampaignsList } from "../../features/CampaignsList";
import { Searcher } from "../../widgets/searcher/ui/Searcher";

export const HomePage: FC = () => (
    <Container maxW="full">
        <Searcher />
        <CampaignsList />
    </Container>
);
