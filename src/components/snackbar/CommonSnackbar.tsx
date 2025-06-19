import { Snackbar, SnackbarProps } from "@mui/material";
import { ReactNode } from "react";

interface CommonSnackbarProps {
  open: boolean;
  //   message: string;
  message: ReactNode; //  string 또는 JSX 모두 허용
  onClose: () => void;
  duration?: number;
  // anchorOrigin?: {
  //   vertical: "top" | "bottom";
  //   horizontal: "left" | "center" | "right";
  // };
  anchorOrigin?: SnackbarProps["anchorOrigin"];
  severity?: "success" | "error";
  sx?: SnackbarProps["slotProps"] extends { content?: { sx?: any } }
    ? any
    : never;
}

const CommonSnackbar = ({
  open,
  message,
  onClose,
  duration = 3000,
  anchorOrigin = { vertical: "bottom", horizontal: "right" },
  severity = "success",
  sx,
}: CommonSnackbarProps) => {
  const baseSx = {
    backgroundColor: "#333",
    color: severity === "error" ? "#fdd835" : "#66bb6a",
    ...(sx || {}), // 외부에서 덮어쓰기 가능
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      message={message}
      anchorOrigin={anchorOrigin}
      // slotProps={{
      //   content: {
      //     sx: {
      //       backgroundColor: "#333", // 예: 차콜 그레이
      //       color: "#fff",
      //     },
      //   },
      // }}
      slotProps={{
        content: {
          sx: baseSx,
        },
      }}
    />
  );
};

export default CommonSnackbar;
