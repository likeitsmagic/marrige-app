import { useQuery } from "@tanstack/react-query";
import { createContext, FC, PropsWithChildren, useState } from "react";
import { IBusiness } from "src/core/types";

import { BusinessApi } from "../api/Business.api";
import { PANELS } from "../constants";
import { Panel } from "../types";

interface IBusinessContext {
	business: IBusiness | undefined;
	isLoading: boolean;
	panel: Panel;
	setPanel: (panel: Panel) => void;
}

export const BusinessContext = createContext<IBusinessContext>({
	business: undefined,
	isLoading: true,
	panel: PANELS.GENERAL_INFORMATION,
	setPanel: () => {},
});

export const BusinessContextProvider: FC<PropsWithChildren> = ({
	children,
}) => {
	const [panel, setPanel] = useState<Panel>(PANELS.GENERAL_INFORMATION);

	const { data, isLoading } = useQuery({
		queryKey: ["business"],
		queryFn: BusinessApi.getBusiness,
	});

	return (
		<BusinessContext.Provider
			value={{
				business: data,
				isLoading,
				panel,
				setPanel,
			}}
		>
			{children}
		</BusinessContext.Provider>
	);
};
