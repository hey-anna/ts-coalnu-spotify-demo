import useGetplaylist from "../hooks/useGetplaylist";
import {
  AddTrackToPlaylistRequest,
  AddTrackToPlaylistResponse,
  CreatePlaylistRequest,
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
  GetPlaylistItemsRequest,
  GetPlaylistItemsResponse,
  GetPlaylistRequest,
  Playlist,
} from "../models/playlist";
import authApiInstance from "../utils/api/authApiInstance";

export const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
  try {
    const response = await authApiInstance.get(`/me/playlists`, {
      params: { limit, offset },
    }); // 호출하려면 Authorization scopes가 - playlist-read-private가 있어야 한다
    // 이렇게 데이터가 오면
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch current user playlists");
  }
};

// limit, offset 을 가져오겠다 - 매개변수로 받는다는 것은
// useGetCurrentUserPlaylists 에 함수 호출할때 에 이미 limit, offset을 보내줘야 우리가 받을 수 있겠다.
// 당연히, 매개변수 생겨서 뭘 요구 하냐? 타입 정의 해주셈

// limit, offset, 파람스 값이 있으니깐, 같이 넣어서 보내줘야 한다

// async 는 리턴 타입 이 있다

export const getPlaylist = async (
  params: GetPlaylistRequest,
): Promise<Playlist> => {
  try {
    const response = await authApiInstance.get(
      `/playlists/${params.playlist_id}`,
      {
        params, // 기타 파라미터 값 market, fields, additional_types
      },
    );
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch playlist detail");
  }
};

export const getPlaylistItems = async (
  params: GetPlaylistItemsRequest,
): Promise<GetPlaylistItemsResponse> => {
  try {
    const response = await authApiInstance.get(
      `/playlists/${params.playlist_id}/tracks`,
      {
        params,
      },
    );
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch playlist items ");
  }
};

export const createPlaylist = async (
  user_id: string,
  payload: CreatePlaylistRequest,
): Promise<Playlist> => {
  try {
    const { name, playListPublic, collaborative, description } = payload;
    const response = await authApiInstance.post(
      `/users/${user_id}/playlists`,
      // payload: playlistData(body=payload)를 payload 변경 함 - 네이밍 일관성 위해
      {
        name,
        public: playListPublic, // 보낼때는 public으로 보내줘야 한다
        collaborative,
        description,
      },
    );
    return response.data;
  } catch (error) {
    throw new Error("fail to create playlist");
  }
};

// 추가 버튼
export const addTrackToPlaylist = async (
  payload: AddTrackToPlaylistRequest,
): Promise<AddTrackToPlaylistResponse> => {
  const { playlist_id, ...body } = payload; // 구조분해로 꺼냄
  try {
    const response = await authApiInstance.post(
      `/playlists/${payload.playlist_id}/tracks`,
      body,
    );
    return response.data;
  } catch (error) {
    throw new Error("fail to add track to playlist");
  }
};
