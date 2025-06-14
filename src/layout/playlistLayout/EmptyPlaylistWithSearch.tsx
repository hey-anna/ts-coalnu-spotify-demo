import { useState } from "react";
import { Typography, TextField } from "@mui/material";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import SearchResultList from "../searchLayout/SearchResultList";

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { data, error, isLoading } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track], // 이놈 ~! 타입 들고 오기
  });
  console.log("SEARCH_TYPE.Track", data); // "SEARCH_TYPE.Album" 결과값을 선택해서 다이나믹하게 찾아 올 수 있다

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <div>
      <Typography variant="h1" my="10px">
        Let's find something for your playlist
      </Typography>
      <TextField value={keyword} onChange={handleSearchKeyword} />
      {data?.pages.map((item) => {
        if (!item.tracks) return false;
        return <SearchResultList list={item.tracks?.items} />;
      })}
    </div>
  );
};

export default EmptyPlaylistWithSearch;
