import { useQuery } from "@tanstack/react-query";
import { GetPlaylistRequest } from "../models/playlist";
import { getPlaylist } from "../apis/playlistApi";

const useGetplaylist = (params: GetPlaylistRequest) => {
  // 항상 호출 x - id 값이 있을때 만 호출
  return useQuery({
    queryKey: ["playlist-detail", params.playlist_id],
    queryFn: () => {
      return getPlaylist(params);
    },
    enabled: !!params.playlist_id, // id가 있을때만 호출
  });
};

export default useGetplaylist;

// queryKey
// id 따라 매번 변경해줘야 해서 id를 넣어준다

// 함수 만들기전에 id 값을 꼭 가져와야 한다

// useGetplaylist 이 함수를 부르는 순간에 가져와야 한다
