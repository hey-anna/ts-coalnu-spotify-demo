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
          width={48}
          height={48}
          borderRadius="50%"
          overflow="hidden"
          bgcolor="#e2e8f0"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={userProfile.images?.[0]?.url || "/images/profile-default.png"}
            alt="프로필 이미지"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      ) : (
        <LoginButton />
      )}
      {/* {userProfile ? (
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {userProfile.images[0]?.url ? (
            <img
              src={userProfile.images[0].url}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="/images/profile-default.png"
              alt="기본 프로필"
              className="w-full h-full object-cover"
            />
            // <AccountCircle fontSize="large" className="text-gray-500" />
          )}
        </div>
      ) : (
        <LoginButton />
      )} */}
    </Box>
  );
};

export default Navbar;
