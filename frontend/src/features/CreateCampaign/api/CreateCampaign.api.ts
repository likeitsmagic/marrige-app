import axiosInstance from "src/core/api/axios";
import { IAdvantage, ICampaign } from "src/core/types";
import { CreateCampaignSchema } from "../schema";

export class CreateCampaignApi {
	static async getAdvantages() {
		return axiosInstance.get<IAdvantage[]>("/advantages");
	}

	static async createCampaign(data: CreateCampaignSchema) {
		return axiosInstance.post<ICampaign>("/campaigns", data);
	}
}
