import { useInfiniteQuery } from "@tanstack/react-query";
import { GetPlaylistItemsRequest } from "../models/playlist";
import { getPlaylistItems } from "../apis/playlistApi";
import useAuthStore from "../store/useAuthStore";

const useGetPlaylistItems = ({
  playlist_id,
  limit,
}: GetPlaylistItemsRequest) => {
  const isSessionValid = useAuthStore((s) => s.hasAccessToken);
  return useInfiniteQuery({
    queryKey: ["playlist-items", playlist_id, limit], // params.playlist_id 뿐만 아니라, limit offset으로도 변화될 수 있어 params통째 넣어주기
    queryFn: ({ pageParam = 0 }) => {
      return getPlaylistItems({ playlist_id, limit, offset: pageParam });
    },
    staleTime: 0,
    // enabled: isSessionValid, // 토큰 있을 때만 요청
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
  });
};

export default useGetPlaylistItems;

// offset
// 계속 값이 동적으로 바껴야 하는 값
// offset 따로 빼서 pageParam의 값을 넣어주고
