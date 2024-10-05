import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, FC, PropsWithChildren, useMemo, useState } from "react";
import { IBusiness } from "src/core/types";
import { WeddingVendorTypeEnum } from "src/core/enums/weddingVendorType.enum";

import { BusinessApi } from "../api/Business.api";
import { PANELS } from "../constants";
import { BusinessValues } from "../schema";
import { Panel } from "../types";

interface IBusinessContext {
	business: IBusiness | undefined;
	isLoading: boolean;
	panel: Panel;
	setPanel: (panel: Panel) => void;
	initialValues: BusinessValues;
	updateBusiness: (business: BusinessValues) => Promise<IBusiness | undefined>;
}

export const BusinessContext = createContext<IBusinessContext>({
	business: undefined,
	isLoading: true,
	panel: PANELS.GENERAL_INFORMATION,
	setPanel: () => {},
	initialValues: {
		name: "",
		description: "",
		address: "",
		phone: "",
		type: WeddingVendorTypeEnum.NONE,
		images: [],
		location: {
			type: "Point",
			coordinates: [],
		},
		minPrice: 0,
		maxPrice: 0,
		socialMedias: [],
	},
	updateBusiness: () => Promise.resolve(undefined),
});

export const BusinessContextProvider: FC<PropsWithChildren> = ({
	children,
}) => {
	const [panel, setPanel] = useState<Panel>(PANELS.GENERAL_INFORMATION);

	const { data, isLoading, refetch } = useQuery({
		queryKey: ["business"],
		queryFn: BusinessApi.getBusiness,
	});

	const { mutateAsync: updateBusiness } = useMutation({
		mutationFn: BusinessApi.updateBusiness,
		onSuccess: async () => {
			await refetch();
		},
	});

	const initialValues: BusinessValues = useMemo(() => {
		return {
			name: data?.name ?? "",
			description: data?.description ?? "",
			address: data?.address ?? "",
			phone: data?.phone ?? "",
			type: data?.type ?? WeddingVendorTypeEnum.NONE,
			location: data?.location ?? {
				type: "Point",
				coordinates: [],
			},
			images: data?.images ?? [],
			minPrice: data?.minPrice ?? 0,
			maxPrice: data?.maxPrice ?? 0,
			socialMedias: data?.socialMedias ?? [],
		};
	}, [data]);

	return (
		<BusinessContext.Provider
			value={{
				business: data,
				isLoading,
				panel,
				setPanel,
				initialValues,
				updateBusiness,
			}}
		>
			{children}
		</BusinessContext.Provider>
	);
};
