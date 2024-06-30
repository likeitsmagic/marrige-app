import axiosInstance from "../api/axios.ts";
import { authTokenKey, refreshTokenKey } from "../constants/constants.ts";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const useAuth = () => {
  const navigation = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const res = await axiosInstance.post<ILoginResponse>('/users/login', { email, password });

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
        }
      }
    }

    return {
      authenticated: false,
      data: null,
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const res = await axiosInstance.post<ILoginResponse>('/users', { email, password });

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
        }
      }
    }

    return {
      registered: false,
      data: null,
    }
  };

  const logout = () => {
    localStorage.removeItem(authTokenKey);
    localStorage.removeItem(refreshTokenKey);

    navigation('/');
  };

  return { login, register, logout };
}