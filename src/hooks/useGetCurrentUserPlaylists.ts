import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/playlistApi";
import { GetCurrentUserPlaylistRequest } from "../models/playlist";

const useGetCurrentUserPlaylists = ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest) => {
  // 이 함수를 호출하는 순간에 받아 오겠다
  return useInfiniteQuery({
    queryKey: ["current-user-playlists"],
    queryFn: ({ pageParam = 0 }) => {
      // initialPageParam 를 여기서 pageParam매개변수로 둔다
      return getCurrentUserPlaylists({ limit, offset: pageParam }); // limit, offset 어디서 받아올 것이냐 ?
    },
    initialPageParam: 0, // 시작 벨류 설정(초기값 세팅)
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseFloat(nextOffset) : undefined;
      }
      return undefined;
    },
  });
};

export default useGetCurrentUserPlaylists;

// offset
// 첫번째 페이지 인덱스 0에서 시작
// 두번째 페이지에서는 인덱스 10에서 시작 하기 때문에
// 이 친구는 값이 계속 변한다

// pageParam = 0
// 값이 없으면 무조건 0으로 해주겠다. 안전빵 초기값 세팅

// getNextPageParam ** 인피니트 쿼리 핵심
// 초기값 이후 다음 페이지 어케 넘어가냐?
// 이 친구의 리턴값이 pageParam 으로 전달되서 offset으로 가게 된다

// lastPage
// getCurrentUserPlaylists
// 패치에서 가져온 데이터값
// api 호출하고, 가져온 리턴값 response.data = 이 값이 lastPage 값
// GetCurrentUserPlaylistResponse

// undefined 재호출 x
// 숫자값이 있으면 계속 재호출
