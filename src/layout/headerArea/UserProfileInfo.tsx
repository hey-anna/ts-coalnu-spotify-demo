// components/common/UserProfileInfo.tsx
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

interface UserProfileInfoProps {
  displayName?: string;
  profileImgSrc?: string | null;
}

const UserProfileInfo = ({
  displayName,
  profileImgSrc,
}: UserProfileInfoProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1.2}>
      {/* <Box>
        <span style={{ fontSize: 18 }}>
         
          <span style={{ color: "#77d36f", fontWeight: 600 }}>
            {displayName}
          </span>
        </span>
      </Box> */}
      {!isMobile && (
        <Box>
          <span style={{ fontSize: 18 }}>
            {/* You're logged in as{" "} */}
            <span style={{ color: "#77d36f", fontWeight: 600 }}>
              {displayName}
            </span>
          </span>
        </Box>
      )}
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
  );
};

export default UserProfileInfo;
