import { GetNewReleasesResponse } from "../models/album";
import axiosInstance from "./axiosInstance";

export const getNewReleases = async (
  clientCreadentialToken: string,
): Promise<GetNewReleasesResponse> => {
  try {
    const response = await axiosInstance.get(`/browse/new-releases?limit=6`, {
      headers: {
        Authorization: `Bearer ${clientCreadentialToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch new releases");
  }
};
