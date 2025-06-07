import axios from "axios";
import { SPOTIFY_BASE_URL } from "../../configs/commonConfig";

const authApiInstance = axios.create({
  baseURL: SPOTIFY_BASE_URL,
});

authApiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// const authApiInstance = axios.create({
//   baseURL: SPOTIFY_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//   },
// });

export default authApiInstance;

// authApiInstance.interceptors.requer // 안함
// interceptors ?
// authApiInstance가 호출되고, 다시 응답을 받는 과정을
// 가져다가 확인하는 것
