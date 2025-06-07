import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

const api = axios.create({
  baseURL: SPOTIFY_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

export default api;

// api.interceptors.requer // 안함
// interceptors ?
// api가 호출되고, 다시 응답을 받는 과정을
// 가져다가 확인하는 것
