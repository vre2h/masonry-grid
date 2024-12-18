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
  --masonry-gap: 1rem;
  --masonry-brick-width: 180px;

  display: grid;
  gap: var(--masonry-gap);

  @supports (grid-template-rows: masonry) {
    /* Modern Masonry Grid Support */
    grid-template-rows: masonry;
    grid-template-columns: repeat(
      auto-fill,
      minmax(var(--masonry-brick-width), 1fr)
    );
  }

  @supports not (grid-template-rows: masonry) {
    /* Fallback for Masonry if not supported */
    column-width: var(--masonry-brick-width);
    column-gap: var(--masonry-gap);
    display: block; /* Behaves as a flexbox fallback */
  }

  & > * {
    /* Consistent spacing for child elements */
    margin-bottom: var(--masonry-gap);
  }
`;

const PhotoItem = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
  transition: transform 0.3s ease;

  color: white;

  &:hover {
    transform: scale(1.05);
  }
`;

export default MasonryGrid;
