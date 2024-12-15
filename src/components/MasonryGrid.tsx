import React from "react";
import styled from "styled-components";
import { Photo } from "../types/Photo";

interface MasonryGridProps {
  photos: Photo[]; // Array of photo objects
  onPhotoClick: (photo: Photo) => void; // Callback when a photo is clicked
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ photos, onPhotoClick }) => {
  return (
    <GridContainer>
      {photos.map((photo) => (
        <PhotoItem
          key={photo.id}
          onClick={() => onPhotoClick(photo)}
          src={photo.src.medium}
          alt={photo.alt || "Photo"}
        />
      ))}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
`;

const PhotoItem = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export default MasonryGrid;
