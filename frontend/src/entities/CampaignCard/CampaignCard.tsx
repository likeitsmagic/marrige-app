import { Box, Card, CardBody, CardHeader, Heading, Link, Stack, StackDivider, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { t } from "i18next";
import { FC } from "react";
import { TCampaign } from "../../shared/models/campaign";

interface ICampaignCardProps {
    campaign: TCampaign
}


export const CampaignCard: FC<ICampaignCardProps> = ({ campaign }) => {
    return (
        <Card>
            <CardHeader>
                <Link as={RouterLink} to={`/campaigns/${campaign.id}`}>
                    <Heading size='md'>{campaign.name}</Heading>
                </Link>
            </CardHeader>

            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        <Heading size='xs'>
                            {t('type')}
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                            {campaign.activitySector.name}
                        </Text>
                    </Box>
                    <Box>
                        <Heading size='xs'>
                            {t('region')}
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                            {campaign.region}
                        </Text>
                    </Box>
                    <Box>
                        <Heading size='xs'>
                            {t('rating')}
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                            {campaign.rating}
                        </Text>
                    </Box>
                </Stack>
            </CardBody>
        </Card>
    );
};