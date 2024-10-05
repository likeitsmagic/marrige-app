import { useQuery } from "@tanstack/react-query";
import {
    createContext,
    FC,
    PropsWithChildren
} from "react";
import { IBusiness } from "src/core/types";
import { BusinessApi } from "../api/Business.api";



interface IBusinessContext {
	business: IBusiness | undefined;
    isLoading: boolean;
}

export const BusinessContext = createContext<IBusinessContext>({
	business: undefined,
    isLoading: true,
});

export const BusinessContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['business'],
        queryFn: BusinessApi.getBusiness,
    });


	return (
		<BusinessContext.Provider
			value={{
				business: data,
				isLoading,
			}}
		>
			{children}
		</BusinessContext.Provider>
	);
};
