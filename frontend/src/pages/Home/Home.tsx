import { FC } from "react";
import { Searcher } from "src/features/Searcher";
import { CampaignList } from "src/features/CampaignList";
export const Home: FC = () => {
	return (
		<div>
			<Searcher />
			<CampaignList />
		</div>
	);
};
