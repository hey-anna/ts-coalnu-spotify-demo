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
  if (isLoading || isFetching) return null;

  const getFallbackImage = (email?: string): string | null => {
    if (!email) return null;
    if (email === "heyannawp@gmail.com") return "/images/profile-anna.png";
    if (email === "tallshe1008@gmail.com") return "/images/profile-coalnu.jpg";
    return "/images/profile-default.png";
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
      {userProfile ? (
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
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default Navbar;
