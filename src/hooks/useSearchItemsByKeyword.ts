import { LastPage, Search } from "@mui/icons-material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchItemsByKeyword } from "../apis/searchApi";
import { SearchRequestParams } from "../models/search";
import useClientCredentialToken from "./useClientCredentialToken";

const useSearchItemsByKeyword = (params: SearchRequestParams) => {
  const clientCredentialToken = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ["search", params], // 파타미터 값
    queryFn: ({ pageParam = 0 }) => {
      if (!clientCredentialToken) throw new Error("no token available");
      return searchItemsByKeyword(clientCredentialToken, {
        ...params,
        offset: pageParam,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPageUrl =
        lastPage.tracks?.next ||
        lastPage.artists?.next ||
        lastPage.albums?.next ||
        lastPage.playlists?.next ||
        lastPage.shows?.next ||
        lastPage.episodes?.next ||
        lastPage.audiobooks?.next;

      if (nextPageUrl) {
        const nextOffset = new URL(nextPageUrl).searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }

      return undefined;
    },
  });
};

export default useSearchItemsByKeyword;

// // 검색 결과 무한 스크롤
// getNextPageParam 까다로운 친구
// 필드 고정 아니다
// 리스펀스가 `Track`, `Artist`, `Album`, `Playlist`, `Show`, `Episode`, `AudioBook`
// L 머가 올지 모른다

// type 통해서 어떤 데이터가 오는지 알 수 있지만
// 추측 안된다잉

// 어떤필드가 올지 모르지만
// 해당 필드 안에 들어서 next를 해줘야 한다 > 다음 offset값을 가져올 수 있다
