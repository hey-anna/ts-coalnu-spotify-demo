import { Box } from "@mui/material";
import LoginButton from "../components/button/LoginButton";
import useGetCurrentUserProfile from "../hooks/useGetCurrentUserProfile";
import { AccountCircle, ArrowForward } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";

const Navbar = () => {
  const {
    data: userProfile,
    isLoading,
    isFetching,
  } = useGetCurrentUserProfile();
  console.log("userProfile", userProfile);
  // 로딩 중일 때 아무것도 렌더링하지 않음
  // isFetching까지 고려해 미세한 깜빡임 방지
  const isLoadingProfile = isLoading || isFetching;
  // if (isLoading || isFetching) return null;

  // 토큰 생성 시각 확인
  const createdAt = Number(localStorage.getItem("token_created_at"));
  const now = Date.now();
  // const isTokenStale = createdAt && now - createdAt >= 55 * 60 * 1000;
  const isTokenStale = Boolean(createdAt) && now - createdAt >= 55 * 60 * 1000;

  // const isTokenStale = createdAt && now - createdAt >= 10 * 1000; // 10초

  console.log("isTokenStale:", isTokenStale, typeof isTokenStale);

  const getFallbackImage = (email?: string): string | null => {
    if (!email) return null;
    if (email === "heyannawp@gmail.com") return "/images/profile-anna.png";
    if (email === "tallshe1008@gmail.com") return "/images/profile-coalnu.jpg";
    return null;
  };

  const profileImgSrc =
    userProfile?.images?.[0]?.url || getFallbackImage(userProfile?.email);

  // 바운스
  const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
`;
  // const BouncingArrow = styled(ArrowForward)`
  //   animation: ${bounce} 1s infinite;
  //   font-size: 18px;
  //   color: #a0aec0;
  // `;
  const BouncingWrapper = styled("div")`
    display: flex;
    align-items: center;
    gap: 6px;
    animation: ${bounce} 1s infinite;
    color: #a0aec0;
    font-size: 12px;
  `;
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
      px={2}
    >
      {isLoadingProfile ? (
        <Box width={48} height={24} /> // 스켈리톤으로 대응하려했으나, 조건분기 및 토큰만료 시간으로 처리 함
      ) : !userProfile || isTokenStale ? ( // 여기로 로그인 버튼 조건분기를 올기고, 토큰만료 전 화면표시
        <Box display="flex" alignItems="flex-end" gap={1.5}>
          {isTokenStale && (
            <BouncingWrapper>
              <span style={{ fontSize: 12, color: "#a0aec0", marginTop: 4 }}>
                세션이 만료되었습니다. 다시 로그인해주세요.
              </span>
              <ArrowForward sx={{ fontSize: 16 }} />
            </BouncingWrapper>
          )}
          {/* <BouncingArrow /> */}
          <LoginButton />
        </Box>
      ) : (
        <Box
          display="flex"
          // flexDirection="column"
          alignItems="center"
          justifyContent="flex-end"
          gap={1.2}
        >
          <Box>
            <span style={{ fontSize: 18 }}>
              You're logged in as{" "}
              <span style={{ color: "#77d36f", fontWeight: 600 }}>
                {userProfile.display_name}
              </span>
            </span>
          </Box>
          <Box
            width={48}
            height={48}
            borderRadius="50%"
            overflow="hidden"
            bgcolor="#e2e8f0"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {profileImgSrc ? (
              <img
                src={profileImgSrc}
                alt="프로필 이미지"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <AccountCircle
                sx={{
                  width: "118.5%",
                  height: "118.5%",
                  color: "#718096",
                }}
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
