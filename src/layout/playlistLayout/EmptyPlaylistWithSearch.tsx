import { useState } from "react";
import { Typography, TextField } from "@mui/material";

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <div>
      <Typography variant="h1" my="10px">
        Let's find something for your playlist
      </Typography>
      <TextField value={keyword} onChange={handleSearchKeyword} />
    </div>
  );
};

export default EmptyPlaylistWithSearch;
