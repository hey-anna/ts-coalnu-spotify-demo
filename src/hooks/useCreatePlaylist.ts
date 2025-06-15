import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaylist } from "../apis/playlistApi";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import { CreatePlaylistRequest } from "../models/playlist";

const useCreatePlaylist = () => {
  const queryClient = useQueryClient();
  const { data: user } = useGetCurrentUserProfile(); // 의미 있는 이름으로 추출

  return useMutation({
    mutationFn: (payload: CreatePlaylistRequest) => {
      // POST body는 data로
      if (user?.id) {
        return createPlaylist(user?.id, payload);
      }
      return Promise.reject(new Error("User is not defined or missing ID"));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
      console.log("성공");
    },
  });
};

//
// export default useCreatePlaylist;
// import { useMutation } from "@tanstack/react-query";
// import { createPlaylist } from "../apis/playlistApi";
// import { CreatePlaylistRequest } from "../models/playlist";
// import { User } from "../models/user";

// const useCreatePlaylist = (user: User | undefined) => {
//   return useMutation({
//     mutationFn: (params: CreatePlaylistRequest) => {
//       if (!user?.id) {
//         return Promise.reject(new Error("User is not defined or missing ID"));
//       }
//       return createPlaylist(user.id, params);
//     },
//     onSuccess: () => {
//       console.log("성공");
//     },
//   });
// };

export default useCreatePlaylist;

//
// post - useMutation

// 로그인 유저값 - 프로파일에서 받아 온다
// mutationFn: (params: CreatePlaylistRequest) => {
//   if (user) {
//     return createPlaylist(user?.id, params);
//   }
//   return Promise.reject(new Error("user is not defined")); // 유저 없을때 거부
// },

// 플러스 버튼 눌렀을때 호출
