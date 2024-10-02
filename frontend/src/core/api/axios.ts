import axios, { AxiosError, AxiosInstance } from "axios";
import i18n from "src/i18n";

import { authTokenKey, refreshTokenKey } from "../auth/contants";

const apiUrl = import.meta.env.VITE_API_URL ?? "" + "/api";

const axiosInstance: AxiosInstance = axios.create({
	baseURL: apiUrl,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept-Language": i18n.language,
	},
});

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem(authTokenKey);

	if (token) {
		config.headers.setAuthorization(`Bearer ${token}`);
	}

	return config;
});

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		if (
			error.config &&
			error.response?.status === 401 &&
			error.config?.url !== "/auth/sign-in" &&
			error.config?.url !== "/auth/sign-up" &&
			error.config?.url !== "/auth/sign-up-business" &&
			error.config?.url !== "/auth/refresh-tokens"
		) {
			await tryToRefreshTokens();

			const newToken = localStorage.getItem(authTokenKey);
			error.config.headers["Authorization"] = `Bearer ${newToken}`;

			return axios(error.config);
		}

		return Promise.reject(error);
	},
);

const tryToRefreshTokens = async () => {
	const refreshToken = localStorage.getItem(refreshTokenKey);
	const res = await axios.post(`${apiUrl}/auth/refresh-tokens`, {
		refreshToken,
	});

	if (res.status === 200 && res.data) {
		localStorage.setItem(authTokenKey, res.data.accessToken);
		localStorage.setItem(refreshTokenKey, res.data.refreshToken);
	}
};

export default axiosInstance;
