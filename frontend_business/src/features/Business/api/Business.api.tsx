import axiosInstance from "src/core/api/axios";
import { IBusiness } from "src/core/types";

import { BusinessValues } from "../schema";

export class BusinessApi {
	static getBusiness = async () => {
		try {
			const response = await axiosInstance.get<IBusiness>("/campaigns/my");
			return response.data;
		} catch {
			// TODO: handle error
		}
	};

	static updateBusiness = async (business: BusinessValues) => {
		try {
			const response = await axiosInstance.post<IBusiness>(
				"/campaigns",
				business,
			);
			return response.data;
		} catch {
			// TODO: handle error
		}
	};
}
