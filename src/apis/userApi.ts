import authApiInstance from "../utils/api/authApiInstance";
import { User } from "../models/user";
import { AxiosError } from "axios";

export const getCurrentUserProfile = async (): Promise<User> => {
  try {
    const response = await authApiInstance.get(`/me`);
    return response.data;
  } catch (error) {
    const status = (error as AxiosError).response?.status;
    console.error("API 호출 실패", (error as AxiosError).response?.status);
    if (status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_created_at");
    }
    throw error;
  }
};
