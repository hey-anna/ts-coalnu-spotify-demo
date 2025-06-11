import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const Highlight = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

const TestLoginModal = ({ open }: { open: boolean }) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    // const alreadySeen = localStorage.getItem("seenLoginModal");
    setVisible(open);
    // if (!alreadySeen) { // 처음 본 사용자에게만 모달 열기
    //   setOpen(true);
    // }
  }, [open]);

  const handleClose = () => {
    // localStorage.setItem("seenLoginModal", "true"); // 닫으면 기록 남김
    setVisible(false);
  };

  return (
    <Dialog open={visible} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{ textAlign: "center", fontWeight: 700, fontSize: "1.4rem" }}
      >
        🎧 Spotify Demo 체험 안내
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <Typography sx={{ mb: 2, textAlign: "center" }}>
          이 사이트는 <Highlight>Spotify OAuth 로그인</Highlight>이 필요합니다.{" "}
          <br />
          아래 <Highlight>체험용 계정</Highlight>으로 로그인해주세요.
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <EmailIcon color="primary" />
          <Typography variant="body1">spotifytest0122@gmail.com</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <LockIcon color="primary" />
          <Typography variant="body1">Spotify0122!test</Typography>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 2, display: "block", textAlign: "center" }}
        >
          ※ 체험용 계정은 공유 목적이며, 정보 변경이나 유료 결제는 금지되어
          있습니다.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button onClick={handleClose} variant="contained" color="primary">
          {/* 확인하고 로그인할게요 */}
          현재 Spotify API 요청 제한으로 정상 이용 불가
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TestLoginModal;
