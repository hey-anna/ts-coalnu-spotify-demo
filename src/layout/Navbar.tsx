import { Box } from "@mui/material";
import LoginButton from "../components/button/LoginButton";
import useGetCurrentUserProfile from "../hooks/useGetCurrentUserProfile";
import { AccountCircle } from "@mui/icons-material";

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  console.log("userProfile", userProfile);
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
      px={2}
    >
      {userProfile ? (
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
      )}
    </Box>
  );
};

export default Navbar;
