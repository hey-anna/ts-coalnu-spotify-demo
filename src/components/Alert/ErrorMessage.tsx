import { Alert } from "@mui/material";

// 이 컴퍼넌트 안에서만 사용되서 여기에 바로 선언
interface ErrorMessageProps {
  errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return <Alert>{errorMessage}</Alert>;
};

export default ErrorMessage;
