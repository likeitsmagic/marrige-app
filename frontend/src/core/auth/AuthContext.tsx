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
import { authTokenKey, refreshTokenKey } from "./contants";
import { ILocation } from "../types";

interface ILoginResponse {
	accessToken: string;
	refreshToken: string;
}

interface IUser {
	id: string;
	email: string;
	permissions: string[];
	isBanned: boolean;
	banReason: string;
	createdAt: string;
	updatedAt: string;
}

interface IAuthContext {
	signin: (
		email: string,
		password: string,
	) => Promise<{ authenticated: boolean; data: ILoginResponse | null }>;
	signup: (
		email: string,
		password: string,
		business: boolean,
		location?: ILocation,
	) => Promise<{ registered: boolean; data: ILoginResponse | null }>;
	logout: () => void;
	updateInfo: () => Promise<void>;
	isAuthenticated: boolean;
	isLoading: boolean;
	user: IUser | undefined;
}

export const AuthContext = createContext<IAuthContext>({
	signin: () => Promise.resolve({ authenticated: false, data: null }),
	signup: () => Promise.resolve({ registered: false, data: null }),
	logout: () => {},
	updateInfo: () => Promise.resolve(),
	isAuthenticated: false,
	isLoading: false,
	user: undefined,
});

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<IUser | undefined>(undefined);

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
				};
			}
		} catch (error) {
			if (isAxiosError(error)) {
				return {
					authenticated: false,
					data: error.response?.data,
				};
			}
		}

		return {
			authenticated: false,
			data: null,
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
					};
				}
			} catch (error) {
				if (isAxiosError(error)) {
					return {
						registered: false,
						data: error.response?.data,
					};
				}
			}

			return {
				registered: false,
				data: null,
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
		try {
			const res = await axiosInstance.get<IUser>("/users/me");

			if (res.status === 200) {
				return res.data;
			}
		} catch (error) {
			if (isAxiosError(error)) {
				return undefined;
			}
		}

		return undefined;
	}, []);

	const updateInfo = useCallback(async () => {
		setIsLoading(true);
		const user = await getMe();
		setUser(user);
		setIsAuthenticated(user !== undefined);
		setIsLoading(false);
	}, [getMe]);

	useEffect(() => {
		setIsLoading(true);

		getMe()
			.then((user) => {
				setIsAuthenticated(user !== undefined);
				setUser(user);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [getMe]);

	return (
		<AuthContext.Provider
			value={{
				signin,
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
