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
          {/* ※ 체험용 계정은 공유 목적이며, 정보 변경이나 유료 결제는 금지되어
          있습니다. */}
          ※ 본 계정은 면접 및 회사 측 확인을 위한 포트폴리오용 테스트
          계정입니다. 사용 후에는 꼭 로그아웃해주시고, 비밀번호는 복사하여
          정확히 입력해주시길 부탁드립니다.
        </Typography>
        <Box
          sx={{
            borderTop: "1px dashed #ccc",
            mt: 3,
            mb: 2,
            width: "100%",
          }}
        />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 1, mt: 2 }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            ⚠️ 확인 부탁드립니다
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            // color: "info.main",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          01 로그인 버튼이 처음 진입 시 보이지 않는 현상은 ✅ 확인하였습니다.
          <br /> 현재 원인 🔎 파악 중이며,
          <Highlight> 수정되는 대로 내용 반영</Highlight>드릴 수 있도록
          하겠습니다. 전체적으로 조금 더 확인해보겠습니다. <br /> <br /> 👀{" "}
          <br />
          <br />
          02 <Highlight>검색 기능 및 예외 처리</Highlight>는 아직 구현이
          완료되지 않은 상태이며,
          <Highlight>6월 13일(목) 중으로 마무리하겠습니다</Highlight>
          <br /> <br />
        </Typography>

        {/* <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: "error.main",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          현재 Spotify API 요청 제한으로 약{" "}
          <Highlight>6월 12일 오전 4시 9분</Highlight> 이후 이용 가능합니다.
        </Typography> */}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button onClick={handleClose} variant="contained" color="primary">
          확인하고 로그인할게요
          {/* 현재 Spotify API 요청 제한으로 정상 이용 불가 */}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TestLoginModal;
