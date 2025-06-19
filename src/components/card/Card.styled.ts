import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const CardWrapper = styled(Box)(({ theme }) => ({
  // borderRadius: theme.shape.borderRadius,
  position: "relative",
  padding: "12px", // ← 카드 내부 여백
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  transition: "background-color 0.3s ease",
  cursor: "pointer",
  overflow: "hidden",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)", // ← 패딩 포함 배경 변화
  },
  "&:hover .hover-overlay": {
    opacity: 1,
  },
}));

export const CardImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  borderRadius: theme.shape.borderRadius,
}));

export const HoverOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  transition: "opacity 0.3s ease-in-out, background-color 0.3s ease-in-out",
  zIndex: 1,
  pointerEvents: "none", // 클릭 이벤트는 CardWrapper가 받도록
}));

export const CardTitle = styled(Typography)({
  marginTop: "8px",
  fontWeight: "bold",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const CardSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const PlusOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: "52px", // 40px 56px 원하는 위치로 조정 가능 (시간 앞)
  top: "50%",
  transform: "translateY(-50%)",
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
  zIndex: 2,
  pointerEvents: "auto", // 클릭 가능하게
}));
