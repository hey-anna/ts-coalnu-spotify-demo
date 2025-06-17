import { MusicNote } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

export interface CategoryCardProps {
  title: string;
  imageUrl: string;
  bgColor: string;
}

const CardContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(2),
  height: 150,
  overflow: "hidden",
  cursor: "pointer",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
  },
}));

const Image = styled("img")({
  position: "absolute",
  right: -12,
  bottom: -20,
  width: 140,
  height: 140,
  objectFit: "cover",
  transform: "rotate(25deg)",
  transition: "transform 0.6s ease",
  opacity: 0.9,
  zIndex: 0,
});

const Title = styled(Typography)(({ theme }) => ({
  zIndex: 1,
  position: "relative",
  opacity: 0.8,
  transition: "all 0.4s ease",
}));

const HoverOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.3s ease",
  zIndex: 2,
  opacity: 0,
  "&:hover": {
    opacity: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}));

const HoverTitle = styled(Typography)(({ theme }) => ({
  color: "white",
  fontWeight: 900,
  fontSize: "2rem",
  transition: "transform 0.4s ease, font-size 0.4s ease",
  textAlign: "center",
}));

const CategoryCard = ({ title, imageUrl, bgColor }: CategoryCardProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <CardContainer
      sx={{ backgroundColor: bgColor }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Title
        variant="h5"
        fontWeight={900}
        sx={{
          ...(hovered && {
            opacity: 0,
          }),
        }}
      >
        {title}
      </Title>

      <Image
        src={imageUrl}
        alt={title}
        style={{
          transform: hovered ? "rotate(360deg) scale(1.2)" : "rotate(25deg)",
        }}
      />

      {hovered && (
        <HoverOverlay>
          <HoverTitle>{title}</HoverTitle>
        </HoverOverlay>
      )}
    </CardContainer>
  );
};

export default CategoryCard;
