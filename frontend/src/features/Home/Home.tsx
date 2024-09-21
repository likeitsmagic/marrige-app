import { FC } from "react";
import { Searcher } from "../Searcher";
import { CampaignList } from "../CampaignList";

export const Home: FC = () => {
	return (
		<div>
			<Searcher />
			<CampaignList />
		</div>
	);
};
