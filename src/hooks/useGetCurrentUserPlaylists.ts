import { useQuery } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/playlistApi";
import { GetCurrentUserPlaylistRequest } from "../models/playlist";

const useGetCurrentUserPlaylists = ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest) => {
  // 이 함수를 호출하는 순간에 받아 오겠다
  return useQuery({
    queryKey: ["current-user-playlists"],
    queryFn: () => {
      return getCurrentUserPlaylists({ limit, offset }); // limit, offset 어디서 받아올 것이냐 ?
    },
  });
};

export default useGetCurrentUserPlaylists;
