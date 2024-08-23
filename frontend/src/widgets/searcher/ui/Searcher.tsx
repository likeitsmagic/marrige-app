import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Heading, HStack, Input, InputGroup, InputLeftElement, InputRightElement, VStack } from "@chakra-ui/react";
import { t } from "i18next";
import { FC } from "react";
export const Searcher: FC = () => {
    return (
        <Container backgroundImage="url('/bg.webp')" backgroundSize="cover" backgroundPosition="center" maxW="container.2xl" width="full" minHeight="720px" position="relative">
            <Box position="absolute" top="0" left="0" right="0" bottom="0" backgroundColor="rgba(0, 0, 0, 0.5)" />
            <VStack position="relative" justifyContent="flex-end" minHeight="720px" pb="40" spacing="4">
                <Heading color="white" fontWeight="light">
                    {t("platform_tagline")}
                </Heading>
                <HStack width={{ base: "95%", md: "70%", lg: "60%", xl: "55%", "2xl": "40%" }} spacing="0">
                    <InputGroup>
                        <InputLeftElement width="2rem">
                            <SearchIcon color='gray.300' />
                        </InputLeftElement>
                        <Input variant="unstyled" padding={2} pl="2rem" bgColor="rgba(255, 255, 255, 0.8)" placeholder={t("search_placeholder")} borderRightRadius={0} borderRight="1px solid gray" />
                    </InputGroup>
                    <InputGroup>
                        <Input p="2" pr="5rem" variant="unstyled" bgColor="rgba(255, 255, 255, 0.8)" placeholder={t("search_location_placeholder")} borderLeftRadius={0} />
                        <InputRightElement width='4.5rem'>
                            <Button borderLeftRadius={0}>
                                {t("search_button")}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </HStack>
            </VStack>
        </Container>
    );
};