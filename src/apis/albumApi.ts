import {
  AlbumDetail,
  GetNewReleasesResponse,
  GetSeveralAlbumsResponse,
} from "../models/album";
import clientApiInstance from "../utils/api/clientApiInstance";

// NewReleases
export const getNewReleases = async (
  clientCreadentialToken: string,
): Promise<GetNewReleasesResponse> => {
  try {
    const response = await clientApiInstance.get(
      `/browse/new-releases?limit=20`,
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

// SeveralAlbums(여러 앨범 상세 정보 요청)
export const getSeveralAlbums = async (
  token: string,
  ids: string[],
): Promise<AlbumDetail[]> => {
  try {
    const queryString = ids.join(",");
    const response = await clientApiInstance.get(`/albums?ids=${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.albums; // 배열
  } catch (error) {
    throw new Error("Failed to fetch album details");
  }
};
