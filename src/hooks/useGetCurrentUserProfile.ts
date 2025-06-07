import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/userApi";
import { User } from "../models/user";
import { useEffect, useState } from "react";

// 이렇게 하면 항상 어떤조건없이 가져 온다 - 기본값
// 로그인 했을 때만 필요
// 로그인 성공 여부 access_token 있냐 없냐로 판단

// 항상 실행하는게 아니라, enabled: accessToken 있을때 만 실행하게 변경
const useGetCurrentUserProfile = (): UseQueryResult<User, Error> => {
  //   const accessToken = localStorage.getItem("access_token");
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  //   const [accessToken, setAccessToken] = useState<string | null>(null);
  //   useEffect(() => {
  //     setAccessToken(localStorage.getItem("access_token"));
  //   }, []);

  return useQuery({
    queryKey: ["current-user-profile"],
    queryFn: getCurrentUserProfile,
    // enabled: typeof window !== "undefined" && !!accessToken, // SSR 방지용
    enabled: !!accessToken, // 없으면 실행안하고 있을때만 함수 실행하기 위해 추가
    // retry: false, // 실패 시 재요청 방지
    staleTime: 0,
  });
};

export default useGetCurrentUserProfile;

// 프로파일 파일 바로 안뜸
// 쿼리키 값 무효화 시켜주기 - 아이디 캐시값 지워주겠다
// 그러면 다시 데이터 가져온다.
