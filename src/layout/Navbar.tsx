import { Box } from "@mui/material";
import LoginButton from "../components/button/LoginButton";
import useGetCurrentUserProfile from "../hooks/useGetCurrentUserProfile";
import { AccountCircle } from "@mui/icons-material";

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
  const isTokenStale = createdAt && now - createdAt >= 55 * 60 * 1000;
  // const isTokenStale = createdAt && now - createdAt >= 20 * 1000; // 20초

  console.log("isTokenStale", isTokenStale);

  const getFallbackImage = (email?: string): string | null => {
    if (!email) return null;
    if (email === "heyannawp@gmail.com") return "/images/profile-anna.png";
    if (email === "tallshe1008@gmail.com") return "/images/profile-coalnu.jpg";
    return null;
  };

  const profileImgSrc =
    userProfile?.images?.[0]?.url || getFallbackImage(userProfile?.email);

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
        <LoginButton />
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
