import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "../configs/authConfig";
import {
  ClientCredentialTokenResponse,
  ExchangeTokenResponse,
} from "../models/auth";
import { REDIRECT_URI_LOCAL, REDIRECT_URI_PROD } from "../configs/commonConfig";

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
              CLIENT_ID + ":" + CLIENT_SECRET,
            )}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      return response.data; //   "https://accounts.spotify.com/api/token" 이거의 결과물 리턴
    } catch (error) {
      throw new Error("Fail to fetch client credential token/api/token");
    }
  };

export const exchangeToken = async (
  code: string,
  codeVerifier: string,
): Promise<ExchangeTokenResponse> => {
  try {
    // const url = "https://accounts.spotify.com/authorize";
    const url = "https://accounts.spotify.com/api/token";

    const redirectUri =
      process.env.NODE_ENV === "development"
        ? REDIRECT_URI_LOCAL
        : REDIRECT_URI_PROD;
    if (!CLIENT_ID || !redirectUri) {
      throw new Error("Missing required parameters");
    }
    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    });
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("🔐 Sending token exchange request with:");
    console.log("client_id:", CLIENT_ID);
    console.log("grant_type:", "authorization_code");
    console.log("code:", code);
    console.log("redirect_uri:", redirectUri);
    console.log("code_verifier:", codeVerifier);

    return response.data;
  } catch (error: any) {
    console.error("❌ Token exchange failed:", error.response?.data || error);
    throw new Error("fail to fetch token");
  }
};
