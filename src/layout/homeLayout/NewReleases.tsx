import { Typography } from "@mui/material";
import useGetNewReleases from "../../hooks/useGetNewReleases";

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();
  console.log("데이터 확인", data);
  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        New Released Albums
      </Typography>
    </div>
  );
};

export default NewReleases;
