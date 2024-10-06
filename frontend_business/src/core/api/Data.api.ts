import axiosInstance from "./axios";

export class DataApi {
	static async getYandexMapsApiKey() {
		try {
			const response = await axiosInstance.get<string>(
				"/data/yandex-maps-api-key",
			);
			return response.data;
		} catch {
			// TODO: handle error
		}
	}
}
