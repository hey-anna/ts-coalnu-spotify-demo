import axios from "axios";
import { SPOTIFY_BASE_URL } from "../../configs/commonConfig";

const clientApiInstance = axios.create({
  baseURL: SPOTIFY_BASE_URL,
});

export default clientApiInstance;
// Authorization 헤더는 각 API 요청할 때 명시적으로 넣기
