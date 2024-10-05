import { Tabs } from "@gravity-ui/uikit";

import { useBusiness } from "../../hooks/useBusiness";

import { BUSINESS_TABS } from "./constants";

export const BusinessTabs = () => {
	const { panel, setPanel } = useBusiness();

	return (
		<Tabs activeTab={panel} onSelectTab={setPanel} items={BUSINESS_TABS} />
	);
};
