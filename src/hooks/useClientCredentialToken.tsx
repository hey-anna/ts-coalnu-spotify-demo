import { useQuery } from "@tanstack/react-query";
import { getClientCredentialToken } from "../apis/authApi";

const useClientCredentialToken = (): string | undefined => {
  const { data } = useQuery({
    queryKey: ["client-credential=token"],
    queryFn: getClientCredentialToken,
  });
  const clientCredentialToken = data?.access_token; // undefined 리턴되는 이유는, 에러나서 값이 없을 수도 있다
  return clientCredentialToken;
};

export default useClientCredentialToken;
