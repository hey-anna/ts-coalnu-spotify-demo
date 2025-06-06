import BounceLoader from "react-spinners/BounceLoader";

interface SpinnerProps {
  message?: string;
}

export default function CommonSpinner({
  message = "로딩 중입니다...",
}: SpinnerProps) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <BounceLoader size={80} color="#3ecdf4" />
      <p className="mt-4 text-lg font-semibold text-sky-600">{message}</p>
    </div>
  );
}
