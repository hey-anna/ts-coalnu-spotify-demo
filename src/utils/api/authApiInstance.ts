import axios from "axios";
import { SPOTIFY_BASE_URL } from "../../configs/commonConfig";

const authApiInstance = axios.create({
  baseURL: SPOTIFY_BASE_URL,
});

// 요청 인터셉터: 매 요청마다 최신 토큰 세팅
authApiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // 다시한번 access_token을 가져와서 호출해주겠다
    // 중간에 api 호출하기전에 가로채서, 다시한번 더 access_token을 세팅 - ㅂ2
  }
  return config;
});

// 응답 인터셉터: 401 에러 시 토큰 제거 + 로그인 페이지로 이동
authApiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const token = localStorage.getItem("access_token");

    if (status === 401 && token) {
      console.warn(
        "401 - 토큰이 있지만 유효하지 않음. 로그인 페이지로 이동합니다.",
      );

      // 토큰 삭제(진짜 로그인한 사용자만 로그아웃 처리)
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_created_at");

      // 로그인 요구 페이지로 강제 이동
      window.location.href = "/login-required";
    } else if (status === 401 && !token) {
      console.info("401 - 토큰 자체가 없음 (비로그인 상태). 이동하지 않음.");
    }

    return Promise.reject(error); // 반드시 다시 throw 해줘야 useQuery에서 에러 인식함
  },
);

export default authApiInstance;

// const authApiInstance = axios.create({
//   baseURL: SPOTIFY_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
// 제일 처음 api 열었을때 한번 설정되면 끝남
// 로그인해서 access_token이 세팅이 되었음에도 불구하고, 이게 웹페이지를 새로 연 상황은 아님
// 그래서 이친구는 다시 호출이 되지 않는다
// null 인상태로 그대로 남아 있다 - 문제
//   },
// });

// authApiInstance.interceptors.requer // 안함
// interceptors ?
// authApiInstance가 호출되고, 다시 응답을 받는 과정을
// 가져다가 확인하는 것
