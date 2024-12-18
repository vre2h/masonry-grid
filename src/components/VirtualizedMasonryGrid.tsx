import React, { useEffect, useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import { Photo } from "../types/Photo";
import { debounce } from "../utils/debounce";
import MasonryGrid from "./MasonryGrid";

interface VirtualizedMasonryGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
  onLoadMore: () => void;
  loading: boolean;
  showLoadMore: boolean;
}

const VirtualizedMasonryGrid: React.FC<VirtualizedMasonryGridProps> = ({
  photos,
  onPhotoClick,
  onLoadMore,
  loading,
  showLoadMore,
}) => {
  const [endIndex, setEndIndex] = useState(40); // Initial number of items to show
  const incrementStep = 50; // Number of items to add on each scroll event

  // Debounced handleScroll function (memoized to prevent re-creation)
  const handleScroll = useCallback(
    debounce(() => {
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const scrollHeight = document.body.scrollHeight;

      // Check if the user has scrolled near the bottom
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        // Add more items
        setEndIndex((prevEndIndex) =>
          Math.min(prevEndIndex + incrementStep, photos.length)
        );
      }
    }, 100), // Adjust debounce delay (100ms in this case)
    [photos.length]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setEndIndex((prevEndIndex) => {
      return Math.min(prevEndIndex + incrementStep, photos.length);
    });
  }, [photos.length]);

  // Memoized visible photos to avoid recalculations
  const visiblePhotos = useMemo(
    () => photos.slice(0, endIndex),
    [endIndex, photos]
  );

  // Memoized onLoadMore handler
  const handleLoadMore = useCallback(() => {
    onLoadMore();
  }, [onLoadMore, photos.length]);

  return (
    <Container>
      <MasonryGrid photos={visiblePhotos} onPhotoClick={onPhotoClick} />
      {loading && <p>Loading...</p>}
      {showLoadMore && (
        <LoadMoreButton onClick={handleLoadMore}>Load More</LoadMoreButton>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 16px;
`;

const LoadMoreButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default VirtualizedMasonryGrid;
