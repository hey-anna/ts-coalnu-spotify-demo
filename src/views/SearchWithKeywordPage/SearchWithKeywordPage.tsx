import { useParams } from "react-router-dom";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import { PAGE_LIMIT20 } from "../../configs/commonConfig";
import SearchResultsLayout from "../../layout/searchLayout/SearchResultsLayout";
import { Typography } from "@mui/material";

const SearchWithKeywordPage = () => {
  const rawKeyword = useParams().keyword;
  const keyword = rawKeyword?.trim() || "";
  console.log("검색 키워드 Test:", keyword);

  // 트랙
  const {
    data: searchResult,
    isLoading: isTrackLoading,
    isError: isTrackError,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
    limit: PAGE_LIMIT20,
  });

  // 앨범
  const {
    data: albumResult,
    isLoading: isAlbumLoading,
    isError: isAlbumError,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Album],
    limit: PAGE_LIMIT20,
  });

  // 아티스트
  const {
    data: artistResult,
    isLoading: isArtistLoading,
    isError: isArtistError,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Artist],
    limit: PAGE_LIMIT20,
  });

  const trackList =
    searchResult?.pages.flatMap((page) => page.tracks?.items || []) || [];
  const albumList =
    albumResult?.pages.flatMap((page) => page.albums?.items || []) || [];
  const artistList =
    artistResult?.pages.flatMap((page) => page.artists?.items || []) || [];

  // 상위 결과
  // 각각 아티스트, 트랙, 앨범, 데이터 첫번째 배열 중 이거 세개중 가장 검색어에 일치순
  // 상위 top 결과, 검색어 일치 순
  // 우선순위는 배열 내 순서에 의해 간접 적용
  // 현재는 artistList[0], trackList[0], albumList[0] 순서이므로,
  // 점수가 같다면 아티스트가 우선
  const normalizedKeyword = keyword.toLowerCase();

  // 각 리스트의 첫 번째 항목
  const firstArtist = artistList[0];
  const firstTrack = trackList[0];
  const firstAlbum = albumList[0];

  // 유틸 함수: 얼마나 비슷한지 점수
  const getMatchScore = (name: string | undefined): number => {
    if (!name) return 0;
    const lower = name.toLowerCase();
    if (lower === normalizedKeyword) return 3; // 완전일치
    if (lower.includes(normalizedKeyword)) return 2; // 부분 포함
    return 1; // 관련은 있지만 불일치
  };

  // 각 항목에 점수 부여
  const scored = [
    { item: firstArtist, score: getMatchScore(firstArtist?.name) },
    { item: firstTrack, score: getMatchScore(firstTrack?.name) },
    { item: firstAlbum, score: getMatchScore(firstAlbum?.name) },
  ];

  // 점수 가장 높은 항목을 Top Result로
  const topResult =
    scored.sort((a, b) => b.score - a.score).find((s) => s.item)?.item || null;

  // 검색어 일치 순
  // const topResult =
  //   artistList.find((item) => item.name?.toLowerCase() === normalizedKeyword) ||
  //   trackList.find((item) => item.name?.toLowerCase() === normalizedKeyword) ||
  //   albumList.find((item) => item.name.toLowerCase() === normalizedKeyword) ||
  //   artistList[0] ||
  //   trackList[0] ||
  //   albumList[0] ||
  //   null;

  // 콘솔 출력
  console.log("trackList", trackList);
  console.log("albumList", albumList);
  console.log("artistList", artistList);

  if (isTrackLoading || isAlbumLoading || isArtistLoading)
    return <div>로딩 중...</div>;
  if (isTrackError || isAlbumError || isArtistError)
    return <div>에러 발생</div>;

  return (
    <>
      {/* <Typography> “{keyword}” 검색 결과</Typography> */}
      <SearchResultsLayout
        tracks={trackList}
        albums={albumList}
        artists={artistList}
        keyword={keyword}
        topResult={topResult}
      />
    </>
  );
};

export default SearchWithKeywordPage;
