import { useMutation } from "@tanstack/react-query";
// import { data } from "react-router-dom";
import { exchangeToken } from "../apis/authApi";
import { ExchangeTokenResponse } from "../models/auth";

const useExchangeToken = () => {
  //   useMutation<응답값 타입, 에러, mutation 함수 파라미터값>({
  return useMutation<
    ExchangeTokenResponse, // 응답값
    Error, // 에러값
    { code: string; codeVerifier: string } // 매개변수
  >({
    // mutationFn: ({ 매개변수 타입 }) => 실행할 함수,
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    // 성공한 데이터 받았을 때 진행할 작업
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.removeItem("code_verifier");
    },
    onError: (error) => {
      console.error("Token exchange mutation error:", error);
    },
  });
};

export default useExchangeToken;

// post useMutation 사용하기
// useMutation 은 제네릭을 써서 타입을 미리 지정 해줘야 한다 (응답값, 에러값, 매개변수)
