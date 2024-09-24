import axiosInstance from "src/core/api/axios";

export class CampaignApi {
	static async getMyCampaign() {
		return axiosInstance.get("/campaigns/my");
	}
}
