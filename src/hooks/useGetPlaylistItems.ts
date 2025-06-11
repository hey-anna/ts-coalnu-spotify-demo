import { useInfiniteQuery } from "@tanstack/react-query";
import { GetPlaylistItemsRequest } from "../models/playlist";
import { getPlaylistItems } from "../apis/playlistApi";

const useGetPlaylistItems = (params: GetPlaylistItemsRequest) => {
  return useInfiniteQuery({
    queryKey: ["playlist-items", params], // params.playlist_id 뿐만 아니라, limit offset으로도 변화될 수 있어 params통째 넣어주기
    queryFn: ({ pageParam }) => {
      return getPlaylistItems({ offset: pageParam, ...params });
    },
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
