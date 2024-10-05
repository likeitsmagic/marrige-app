import axiosInstance from "src/core/api/axios";
import { IBusiness } from "src/core/types";

export class BusinessApi {
  static getBusiness = async () => {
    try {
      const response = await axiosInstance.get<IBusiness>('/campaigns/my');
      return response.data;
    } catch {
      // TODO: handle error
    }
  };
}
