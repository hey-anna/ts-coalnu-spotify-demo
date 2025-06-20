import { useQuery } from "@tanstack/react-query";
import { getSeveralAlbums } from "../apis/albumApi";
import useClientCredentialToken from "./useClientCredentialToken";
import { AlbumDetail } from "../models/album";

const useGetSeveralAlbums = (ids: string[]) => {
  const clientCreadentialToken = useClientCredentialToken();

  return useQuery<AlbumDetail[]>({
    queryKey: ["several-albums", ids],
    enabled: !!clientCreadentialToken && ids.length > 0,
    queryFn: () => {
      if (!clientCreadentialToken) {
        throw new Error("No token available");
      }
      return getSeveralAlbums(clientCreadentialToken, ids); //  이제 반환값이 AlbumDetail[]
    },
  });
};

export default useGetSeveralAlbums;
