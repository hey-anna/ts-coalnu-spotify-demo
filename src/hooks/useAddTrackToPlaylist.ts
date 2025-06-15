import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTrackToPlaylist } from "../apis/playlistApi";
import { AddTrackToPlaylistRequest } from "../models/playlist";

const useAddTrackToPlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddTrackToPlaylistRequest) => {
      return addTrackToPlaylist(payload);
    },
    onSuccess: () => {
      //   setShowSearch(false); // 검색창 닫기
      // 사이드메뉴 플레이리스트 목록도 갱신
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
      queryClient.invalidateQueries({ queryKey: [" playlist-detail"] });
      queryClient.invalidateQueries({ queryKey: ["playlist-items"] });

      //   // 플레이리스트 헤더 정보 갱신
      //   queryClient.invalidateQueries(["playlist-header", playlistId]);

      //   // 트랙 목록 갱신
      //   queryClient.invalidateQueries(["playlist-items", playlistId]);

      //
      //   queryClient.invalidateQueries(["current-user-playlists"]);

      console.log("추가하기 성공");
    },
  });
};

export default useAddTrackToPlaylist;
