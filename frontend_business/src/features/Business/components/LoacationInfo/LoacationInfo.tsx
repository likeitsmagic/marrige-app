import { Card, Container } from "@gravity-ui/uikit";
import { YMaps, Map } from "@pbe/react-yandex-maps";
import { CONTAINER_PADDING } from "src/core/constants";

const LOCATION = {
	center: [37.588144, 55.733842],
	zoom: 9,
};

export const LocationInfo = () => {
	return (
		<Card>
			<Container style={CONTAINER_PADDING}>
				<div>
					<YMaps>
						<div>
							<Map
								defaultState={LOCATION}
								style={{ width: "100%", height: 400 }}
							/>
						</div>
					</YMaps>
				</div>
			</Container>
		</Card>
	);
};
