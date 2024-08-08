import axiosInstance from "../api/axios.ts";
import { authTokenKey, refreshTokenKey } from "../constants/constants.ts";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useCallback } from "react";

interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const useAuth = () => {
  const navigation = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await axiosInstance.post<ILoginResponse>(
        "/users/auth/signin",
        { email, password },
      );

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

  const register = useCallback(
    async (email: string, password: string, business: boolean) => {
      try {
        const res = await axiosInstance.post<ILoginResponse>(
          "/users/auth/signup",
          { email, password, business },
        );

        if (res.status === 201) {
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
    localStorage.removeItem(authTokenKey);
    localStorage.removeItem(refreshTokenKey);

    navigation("/");
  }, [navigation]);

  const isAuthenticated = useCallback(() => {
    const token = localStorage.getItem(authTokenKey);
    return token !== null;
  }, []);

  return { login, register, logout, isAuthenticated };
};
