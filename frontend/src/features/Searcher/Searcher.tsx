import { Button, Col, Icon, Row, TextInput } from "@gravity-ui/uikit";
import { Geo } from "@gravity-ui/icons";
import i18n from "src/i18n";

export const Searcher = () => {
	return (
		<Row space={1}>
			<Col s={12} m={6} l={8} xl={9}>
				<TextInput
					size="xl"
					placeholder={i18n.i18n("searcher", "search_placeholder")}
				/>
			</Col>
			<Col s={4} m={2} l={2} xl={1}>
				<Button size="xl" view="action">
					{i18n.i18n("searcher", "search")}
				</Button>
			</Col>
			<Col s={6} m={4} l={2} xl={2}>
				<Button view="outlined" size="xl">
					<Icon data={Geo} />
					{i18n.i18n("searcher", "all_regions")}
				</Button>
			</Col>
		</Row>
	);
};

export const SearcherName = "searcher";
