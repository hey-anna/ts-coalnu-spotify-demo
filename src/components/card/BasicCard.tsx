import PlayButton from "../button/PlayButton";
import {
  CardImage,
  CardSubtitle,
  CardTitle,
  CardWrapper,
  HoverOverlay,
} from "./Card.styled";

interface BasicCardProps {
  name: string;
  image: string;
  artistsName: string | undefined;
  onPlayClick?: () => void;
}

const BasicCard = ({
  image,
  name,
  artistsName,
  onPlayClick,
}: BasicCardProps) => {
  return (
    <CardWrapper onClick={onPlayClick}>
      <CardImage src={image} alt={name} />
      <HoverOverlay className="hover-overlay">
        <PlayButton />
      </HoverOverlay>
      <CardTitle variant="body1">{name}</CardTitle>
      <CardSubtitle variant="body2">{artistsName}</CardSubtitle>
    </CardWrapper>
  );
};

export default BasicCard;
