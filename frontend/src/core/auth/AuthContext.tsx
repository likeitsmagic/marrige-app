import { isAxiosError } from "axios";
import {
	createContext,
	FC,
	PropsWithChildren,
	useCallback,
	useEffect,
	useState,
} from "react";

import axiosInstance from "../api/axios";
import { ILocation, IUser } from "../types";
import { User } from "../models/User";

import { authTokenKey, refreshTokenKey } from "./contants";

interface ILoginResponse {
	accessToken: string;
	refreshToken: string;
	message?: string;
}

interface IAuthContext {
	signin: (
		email: string,
		password: string,
	) => Promise<{
		authenticated: boolean;
		data: ILoginResponse | null;
		error: string | undefined;
	}>;
	signInOAuth: (oauthToken: string) => Promise<{
		authenticated: boolean;
		data: ILoginResponse | null;
		error: string | undefined;
	}>;
	signup: (
		email: string,
		password: string,
		business: boolean,
		location?: ILocation,
	) => Promise<{
		registered: boolean;
		data: ILoginResponse | null;
		error: string | undefined;
	}>;
	logout: () => void;
	updateInfo: () => Promise<void>;
	isAuthenticated: boolean;
	isLoading: boolean;
	user: User | undefined;
}

export const AuthContext = createContext<IAuthContext>({
	signin: () =>
		Promise.resolve({ authenticated: false, data: null, error: undefined }),
	signInOAuth: () =>
		Promise.resolve({ authenticated: false, data: null, error: undefined }),
	signup: () =>
		Promise.resolve({ registered: false, data: null, error: undefined }),
	logout: () => {},
	updateInfo: () => Promise.resolve(),
	isAuthenticated: false,
	isLoading: true,
	user: undefined,
});

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<User | undefined>(undefined);

	const signin = useCallback(async (email: string, password: string) => {
		try {
			const res = await axiosInstance.post<ILoginResponse>("/auth/sign-in", {
				email,
				password,
			});

			if (res.status === 200) {
				localStorage.setItem(authTokenKey, res.data.accessToken);
				localStorage.setItem(refreshTokenKey, res.data.refreshToken);

				return {
					authenticated: true,
					data: res.data,
					error: undefined,
				};
			}
		} catch (error) {
			if (isAxiosError(error)) {
				return {
					authenticated: false,
					data: null,
					error:
						error.response?.status === 401
							? error.response?.data.message
							: undefined,
				};
			}
		}

		return {
			authenticated: false,
			data: null,
			error: undefined,
		};
	}, []);

	const signInOAuth = useCallback(async (oauthToken: string) => {
		try {
			const res = await axiosInstance.post<ILoginResponse>(
				"/auth/sign-in-oauth",
				{
					oauthToken,
				},
			);

			if (res.status === 200) {
				localStorage.setItem(authTokenKey, res.data.accessToken);
				localStorage.setItem(refreshTokenKey, res.data.refreshToken);

				return {
					authenticated: true,
					data: res.data,
					error: undefined,
				};
			}
		} catch (error) {
			if (isAxiosError(error)) {
				return {
					authenticated: false,
					data: null,
					error:
						error.response?.status === 401
							? error.response?.data.message
							: undefined,
				};
			}
		}

		return {
			authenticated: false,
			data: null,
			error: undefined,
		};
	}, []);

	const signup = useCallback(
		async (
			email: string,
			password: string,
			business: boolean,
			location?: ILocation,
		) => {
			try {
				const res = await axiosInstance.post<ILoginResponse>(
					business ? "/auth/sign-up-business" : "/auth/sign-up",
					{ email, password, location },
				);

				if (res.status === 201) {
					localStorage.setItem(authTokenKey, res.data.accessToken);
					localStorage.setItem(refreshTokenKey, res.data.refreshToken);

					return {
						registered: true,
						data: res.data,
						error: undefined,
					};
				}
			} catch (error) {
				if (isAxiosError(error)) {
					return {
						registered: false,
						data: error.response?.data,
						error:
							error.response?.status === 400
								? error.response?.data.message
								: undefined,
					};
				}
			}

			return {
				registered: false,
				data: null,
				error: undefined,
			};
		},
		[],
	);

	const logout = useCallback(() => {
		setUser(undefined);
		localStorage.removeItem(authTokenKey);
		localStorage.removeItem(refreshTokenKey);
	}, []);

	const getMe = useCallback(async () => {
		setIsLoading(true);
		try {
			const res = await axiosInstance.get<IUser>("/users/me");

			if (res.status === 200) {
				setIsLoading(false);
				return res.data;
			}
		} catch (error) {
			if (isAxiosError(error)) {
				setIsLoading(false);
				return undefined;
			}
		}

		setIsLoading(false);
		return undefined;
	}, []);

	const updateInfo = useCallback(async () => {
		const user = await getMe();
		if (user) {
			setUser(new User(user));
		}
		setIsAuthenticated(user !== undefined);
	}, [getMe]);

	useEffect(() => {
		getMe().then((user) => {
			setIsAuthenticated(user !== undefined);
			if (user) {
				setUser(new User(user));
			}
		});
	}, [getMe]);

	return (
		<AuthContext.Provider
			value={{
				signin,
				signInOAuth,
				signup,
				logout,
				isAuthenticated,
				isLoading,
				user,
				updateInfo,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
