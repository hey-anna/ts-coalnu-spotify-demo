import { GetNewReleasesResponse } from "../models/album";
import clientApiInstance from "../utils/api/clientApiInstance";

export const getNewReleases = async (
  clientCreadentialToken: string,
): Promise<GetNewReleasesResponse> => {
  try {
    const response = await clientApiInstance.get(
      `/browse/new-releases?limit=6`,
      {
        headers: {
          Authorization: `Bearer ${clientCreadentialToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch new releases");
  }
};
