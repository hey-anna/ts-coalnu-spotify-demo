import authApiInstance from "../utils/api/authApiInstance";
import { User } from "../models/user";

export const getCurrentUserProfile = async (): Promise<User> => {
  try {
    const response = await authApiInstance.get(`/me`);
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch user profile");
  }
};
