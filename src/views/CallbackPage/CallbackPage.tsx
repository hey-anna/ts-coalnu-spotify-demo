import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useExchangeToken from "../../hooks/useExchangeToken";
import {
  REDIRECT_URI_LOCAL,
  REDIRECT_URI_PROD,
} from "../../configs/commonConfig";

const CallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const code = searchParams.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");
  const { mutate: exchangeToken } = useExchangeToken();
  //   useEffect(() => {
  //     console.log("NODE_ENV:", process.env.NODE_ENV); // 여기에 찍기
  //   }, []);

  //   const redirectUri =
  //     process.env.NODE_ENV === "development"
  //       ? REDIRECT_URI_LOCAL
  //       : REDIRECT_URI_PROD;
  const isCalled = useRef(false);

  useEffect(() => {
    // if (!code || !codeVerifier) return; // 조건 미충족 시 아무것도 하지 않음
    // if (!code || !codeVerifier || isCalled.current) return;
    // isCalled.current = true; // 호출 이후에 true 설정

    console.log("📥 콜백에서 받은 code:", code);
    console.log("📥 콜백에서 불러온 code_verifier:", codeVerifier);
    if (code && codeVerifier) {
      exchangeToken(
        { code, codeVerifier },
        {
          onSuccess: (data) => {
            // navigate("/"); // 또는 원하는 경로로
            // localStorage.setItem("access_token", data.access_token); // 필요 시 중복되도 OK
            console.log("✅ 토큰 발급 성공, 리디렉션 시작");
            localStorage.removeItem("code_verifier"); // 재사용 방지
            const redirect = localStorage.getItem("redirectAfterLogin") || "/";
            console.log("✅ navigate to:", redirect);
            navigate(redirect);
            // navigate 이후 URL 정리
            setTimeout(() => {
              window.history.replaceState({}, document.title, "/callback");
            }, 0);
            // window.history.replaceState({}, document.title, "/callback"); // code 제거
          },
          onError: () => {
            console.error("토큰 교환 실패");
            navigate("/error"); // 혹은 에러 페이지로 이동
          },
        },
      );
    }
    //  else {
    //   navigate("/"); // code 또는 verifier 없으면 홈으로
    // }
  }, [code, codeVerifier, exchangeToken]);

  return <p>로그인 처리 중입니다...</p>;
};

export default CallbackPage;

// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import useExchangeToken from "../../hooks/useExchangeToken";

// const CallbackPage = () => {
//   const navigate = useNavigate();

//   // const urlParams = new URLSearchParams(window.location.search);
//   const [searchParams] = useSearchParams(); // 권장 방식
//   const { mutate: exchangeToken } = useExchangeToken();

//   useEffect(() => {
//     // let code = urlParams.get("code");
//     let code = searchParams.get("code"); // 권장 방식
//     let codeVerifier = localStorage.getItem("code_verifier");

//     if (code && codeVerifier) {
//       // 1. code로 토큰 요청
//       // 2. 토큰 저장 (예: localStorage.setItem)
//       // 3. 리디렉션 (그런 다음 원래 페이지로 이동)
//       // navigate("/"); // 혹은 저장된 리턴 주소로 이동 가능
//       exchangeToken(
//         { code, codeVerifier },
//         {
//           onSuccess: () => {
//             const redirect = localStorage.getItem("redirectAfterLogin") || "/";
//             navigate(redirect);
//           },
//           onError: () => {
//             console.error("토큰 교환 실패");
//             navigate("/");
//           },
//         },
//       );
//     } else {
//       // 에러 처리 또는 홈으로
//       navigate("/");
//     }
//   }, [searchParams, exchangeToken, navigate]);

//   return <div> 로그인 처리 중...</div>;
// };

// export default CallbackPage;

// const urlParams = new URLSearchParams(window.location.search);

// let code = urlParams.get("code");
// let codeVerifier = localStorage.getItem("code_verifier");
// // const getToken = async (code) => {};
// const { mutate: exchangeToken } = useExchangeToken();

// // url의 code값이 포함되어 있을 때, codeVerifier이 정확히 있을때만 mutate 실행하기
// useEffect(() => {
//   // code && codeVerifier 있으면 실행해주고, 이 값을 토큰에 보내준다
//   if (code && codeVerifier) {
//     exchangeToken({ code, codeVerifier });
//   }
// }, [code, codeVerifier, exchangeToken]);
