import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (!accessToken) {
      navigate("/login-required");
    }
  }, [accessToken, navigate]);

  // 토큰 없으면 위에서 이동, 있으면 children 렌더
  return <>{accessToken ? children : null}</>;
};

export default AuthGuard;
