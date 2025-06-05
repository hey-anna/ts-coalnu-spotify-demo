import axios from "axios";
import { clientId, clientSecret } from "../configs/authConfig";
import { ClientCredentialTokenResponse } from "../models/auth";

const encodedBase64 = (data: string): string => {
  if (typeof window !== "undefined") {
    // 브라우저 환경
    return btoa(data);
  } else {
    // Node.js 환경
    return Buffer.from(data).toString("base64");
  }
};
// const encodedBase64 = (data: string) => {
//   return Buffer.from(data).toString("base64");
// };
// 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))

export const getClientCredentialToken =
  async (): Promise<ClientCredentialTokenResponse> => {
    try {
      const body = new URLSearchParams({
        grant_type: "client_credentials",
      });
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        body,
        {
          headers: {
            Authorization: `Basic ${encodedBase64(
              clientId + ":" + clientSecret,
            )}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      return response.data; //   "https://accounts.spotify.com/api/token" 이거의 결과물 리턴
    } catch (error) {
      throw new Error("Fail to fetch client credential token");
    }
  };
