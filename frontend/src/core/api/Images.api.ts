import axiosInstance from "./axios";

export class ImagesApi {
	static async uploadImages(data: FormData) {
		return axiosInstance.post<Array<{ url: string }>>("/images", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	}
}
