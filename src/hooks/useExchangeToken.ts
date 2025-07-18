import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { data } from "react-router-dom";
import { exchangeToken } from "../apis/authApi";
import { ExchangeTokenResponse } from "../models/auth";
import { getCurrentUserProfile } from "../apis/userApi";
import { PAGE_LIMIT10 } from "../configs/commonConfig";
import { getCurrentUserPlaylists } from "../apis/playlistApi";

const useExchangeToken = () => {
  const queryClient = useQueryClient();

  //   useMutation<응답값 타입, 에러, mutation 함수 파라미터값>({
  return useMutation<
    ExchangeTokenResponse, // 응답값
    Error, // 에러값
    { code: string; codeVerifier: string } // 매개변수
  >({
    // mutationFn: ({ 매개변수 타입 }) => 실행할 함수,
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    // 성공한 데이터 받았을 때 진행할 작업
    onSuccess: async (data) => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token_created_at", Date.now().toString());
      localStorage.removeItem("code_verifier");

      // 이전 사용자 정보 무효화 : 캐시 무효화 코드 삭제
      queryClient.invalidateQueries({
        queryKey: ["current-user-profile"], // useGetCurrentUserProfile.ts // 쿼리 키값 무효화
      });

      // 플레이리스트 전체 무효화 (playlist_id 상관없이)
      queryClient.invalidateQueries({
        queryKey: ["current-user-playlists"],
        exact: false, // 모든 하위 키 포함 무효화
      });

      // 강제로 새로 가져오기 : 직접 새 쿼리 실행해서 데이터 가져오기
      const profile = await getCurrentUserProfile();
      // 첫 페이지 플레이리스트 강제 fetch + 캐시 등록
      const playlist = await getCurrentUserPlaylists({
        limit: PAGE_LIMIT10,
        offset: 0,
      });
      // 쿼리 캐시에 강제로 세팅
      queryClient.setQueryData(["current-user-profile"], profile);
      queryClient.setQueryData(["current-user-playlists"], {
        pageParams: [0],
        pages: [playlist], // useInfiniteQuery 구조에 맞게
      });
    },
    onError: (error) => {
      console.error("Token exchange mutation error:", error);
    },
  });
};

export default useExchangeToken;

// post useMutation 사용하기
// useMutation 은 제네릭을 써서 타입을 미리 지정 해줘야 한다 (응답값, 에러값, 매개변수)

// 쿼리 키값 무효화 ?
// queryKey: ["current-user-profile"] 이아디 밑으로 저장되어 있었던 정보를 다 없애겠다
// 그러면 이걸 무효화 시키면서, 다시 새로운 프로파일(이미지등) 정보를 가져오게 된다

// 캐시 무효과 코드 적용되지 않아, 쿼리 캐시 강제 세팅으로 fix
