import { Typography } from "@mui/material";

interface BasicCardProps {
  name: string;
  image: string;
  artistsName: string | undefined;
}

const BasicCard = ({ image, name, artistsName }: BasicCardProps) => {
  return (
    <>
      <img src={image} />
      <Typography>{name}</Typography>
      <Typography>{artistsName}</Typography>
    </>
  );
};

export default BasicCard;
