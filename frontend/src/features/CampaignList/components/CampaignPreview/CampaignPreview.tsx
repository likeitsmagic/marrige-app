import { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { StarFill } from "@gravity-ui/icons";
import { Card, Flex, Text, Tooltip } from "@gravity-ui/uikit";

import { TCampaign } from "../../types";

interface ICampaignPreviewProps {
	campaign: TCampaign;
}

export const CampaignPreview: FC<ICampaignPreviewProps> = ({ campaign }) => {
	const fallbackImage =
		"https://openlab.sps.cuny.edu/omvss/wp-content/themes/koji/assets/images/default-fallback-image.png";
	const [image, setImage] = useState(campaign.images?.[0] || fallbackImage);

	const handleImageError = useCallback(
		(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
			event.currentTarget.onerror = null;
			setImage(
				"https://openlab.sps.cuny.edu/omvss/wp-content/themes/koji/assets/images/default-fallback-image.png",
			);
		},
		[],
	);

	return (
		<Card size="l" overflow="hidden" type="action">
			<Link
				to={`/campaigns/${campaign.id}`}
				style={{ textDecoration: "none", color: "inherit" }}
			>
				<Flex height="300px">
					<img
						src={image}
						alt={campaign.name}
						width="100%"
						height="100%"
						style={{ objectFit: "cover" }}
						onError={handleImageError}
					/>
				</Flex>
				<Flex style={{ padding: "12px" }} gap={2} direction="column">
					<Tooltip content={campaign.name}>
						<Text variant="header-1" ellipsis>
							{campaign.name}
						</Text>
					</Tooltip>
					<Flex gap={2}>
						<StarFill color="var(--g-color-base-brand)" />
						<Text>{campaign.rating}</Text>
					</Flex>
				</Flex>
			</Link>
		</Card>
	);
};
