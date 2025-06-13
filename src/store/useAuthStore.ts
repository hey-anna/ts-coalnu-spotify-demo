import { create } from "zustand";

interface AuthState {
  accessToken: string | null; // 실제 토큰 값 (API 호출에 사용)
  hasAccessToken: boolean; // 토큰 존재 여부 상태값 (조건 분기에 사용)
  setAccessToken: (token: string) => void;
  clearToken: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("access_token"),
  hasAccessToken: !!localStorage.getItem("access_token"), // accessToken 값이 있으면 true
  setAccessToken: (token) => {
    localStorage.setItem("access_token", token);
    set({ accessToken: token, hasAccessToken: true });
  },
  clearToken: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_created_at");
    set({ accessToken: null, hasAccessToken: false });
  },
}));

export default useAuthStore;
