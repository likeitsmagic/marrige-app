import { Button, Col, Icon, Row, TextInput } from "@gravity-ui/uikit";
import { Geo } from "@gravity-ui/icons";
import i18n from "src/i18n";

export const Searcher = () => {
	return (
		<Row space={1}>
			<Col s={9}>
				<TextInput
					size="xl"
					placeholder={i18n.i18n("searcher", "search_placeholder")}
				/>
			</Col>
			<Col>
				<Button size="xl" view="action">
					{i18n.i18n("searcher", "search")}
				</Button>
			</Col>
			<Col>
				<Button view="outlined" size="xl">
					<Icon data={Geo} />
					{i18n.i18n("searcher", "all_regions")}
				</Button>
			</Col>
		</Row>
	);
};

export const SearcherName = "searcher";
