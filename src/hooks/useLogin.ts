import { getSpotifyAuthUrl } from "../utils/auth";

const useLogin = () => {
  const login = () => {
    getSpotifyAuthUrl();
  };

  return login;
};

export default useLogin;
