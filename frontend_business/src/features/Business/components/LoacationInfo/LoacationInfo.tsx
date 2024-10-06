import { TriangleDownFill } from "@gravity-ui/icons";
import {
	Box,
	Card,
	Container,
	Flex,
	Overlay,
	Spin,
	Text,
} from "@gravity-ui/uikit";
import { Map, SearchControl, YMaps, ZoomControl } from "@pbe/react-yandex-maps";
import { CONTAINER_PADDING } from "src/core/constants";
import i18n from "src/i18n";

import { LOCATION } from "./constants";
import { useLocationInfo } from "./hooks/useLocationInfo";

export const LocationInfo = () => {
	const {
		isLoading,
		address,
		mapCenter,
		handleLoad,
		handleMapChange,
		handleSearchResult,
		yandexMapsApiKey,
	} = useLocationInfo();

	return (
		<Card>
			<Container style={CONTAINER_PADDING}>
				<Flex style={{ marginBottom: 16 }} alignItems="center" gap={2}>
					<Text variant="subheader-2">{i18n.i18n("business", "location")}</Text>
					<Text variant="body-1">{address}</Text>
				</Flex>
				<Box position="relative">
					<YMaps query={{ apikey: yandexMapsApiKey }}>
						<div style={{ position: "relative" }}>
							<Map
								state={{ center: mapCenter, zoom: LOCATION.zoom }}
								style={{ width: "100%", height: 600 }}
								onLoad={handleLoad}
								onBoundsChange={handleMapChange}
							>
								<SearchControl
									options={{
										float: "left",
										placeholderContent: i18n.i18n("business", "search_geo"),
										noSuggestPanel: true,
									}}
									instanceRef={handleSearchResult}
								/>
								<ZoomControl />
							</Map>
							<div
								style={{
									position: "absolute",
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)",
									pointerEvents: "none",
								}}
							>
								{!isLoading && <TriangleDownFill color="red" />}
							</div>
						</div>
					</YMaps>
					<Overlay visible={isLoading}>
						<Spin />
					</Overlay>
				</Box>
			</Container>
		</Card>
	);
};
