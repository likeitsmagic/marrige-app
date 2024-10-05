import { useMemo } from "react";
import { WeddingVendorTypeEnum } from "src/core/enums/weddingVendorType.enum";

import { BusinessValues } from "../schema";

import { useBusiness } from "./useBusiness";

export const useEditBusiness = () => {
	const { business } = useBusiness();

	const initialValues: BusinessValues = useMemo(() => {
		return {
			name: business?.name ?? "",
			description: business?.description ?? "",
			address: business?.address ?? "",
			phone: business?.phone ?? "",
			type: business?.type ?? WeddingVendorTypeEnum.NONE,
			location: business?.location ?? {
				type: "Point",
				coordinates: [],
			},
			minPrice: business?.minPrice ?? 0,
			maxPrice: business?.maxPrice ?? 0,
			socialMedias: business?.socialMedias ?? [],
		};
	}, [business]);

	return {
		initialValues,
	};
};
