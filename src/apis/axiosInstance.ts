import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

const axiosInstance = axios.create({
  baseURL: SPOTIFY_BASE_URL,
  headers: {
    // 필요 시 Authorization 토큰 등을 여기에 설정
    // Authorization: `Bearer ${Token}`,
  },
});

export default axiosInstance;
