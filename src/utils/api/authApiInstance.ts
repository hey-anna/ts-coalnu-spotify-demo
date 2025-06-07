import axios from "axios";
import { SPOTIFY_BASE_URL } from "../../configs/commonConfig";

const authApiInstance = axios.create({
  baseURL: SPOTIFY_BASE_URL,
});

authApiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // 다시한번 access_token을 가져와서 호출해주겠다
    // 중간에 api 호출하기전에 가로채서, 다시한번 더 access_token을 세팅 - ㅂ2
  }
  return config;
});

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

export default authApiInstance;

// authApiInstance.interceptors.requer // 안함
// interceptors ?
// authApiInstance가 호출되고, 다시 응답을 받는 과정을
// 가져다가 확인하는 것
