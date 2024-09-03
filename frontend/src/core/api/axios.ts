import axios, { AxiosInstance } from "axios";
import { authTokenKey, refreshTokenKey } from "../auth/contants";
import { camelizeKeys, decamelizeKeys } from "humps";
import { getApiUrl } from "./getApiUrl";
import { Services } from "./constants";

const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(authTokenKey);

  if (token) {
    config.headers.setAuthorization(`Bearer ${token}`);
  }

  if (config.params) {
    config.params = decamelizeKeys(config.params);
  }

  if (config.data) {
    config.data = decamelizeKeys(config.data);
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = camelizeKeys(response.data);
    }

    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      await tryToRefreshTokens();

      const newToken = localStorage.getItem(authTokenKey);
      error.config.headers["Authorization"] = `Bearer ${newToken}`;

      return axios(error.config);
    }

    return Promise.reject(error);
  }
);

const tryToRefreshTokens = async () => {
  const refreshToken = localStorage.getItem(refreshTokenKey);
  const res = await axios.post(
    getApiUrl(Services.userService, "auth/refresh"),
    {
      [refreshTokenKey]: refreshToken,
    }
  );

  if (res.status === 200 && res.data) {
    localStorage.setItem(authTokenKey, res.data.access_token);
    localStorage.setItem(refreshTokenKey, res.data.refresh_token);
  }
};

export default axiosInstance;
