import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTrackToPlaylist } from "../apis/playlistApi";
import { AddTrackToPlaylistRequest } from "../models/playlist";

const useAddTrackToPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddTrackToPlaylistRequest) => {
      // uri 배열 유효성 체크
      if (!payload.uris || payload.uris.length === 0) {
        return Promise.reject(new Error("No track URI provided"));
      }
      return addTrackToPlaylist(payload);
    },
    onSuccess: (_, variables) => {
      const { playlist_id } = variables;
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
      queryClient.invalidateQueries({
        queryKey: ["playlist-detail", playlist_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["playlist-items", playlist_id],
      });

      console.log("추가하기 성공");
    },
  });
};

export default useAddTrackToPlaylist;
