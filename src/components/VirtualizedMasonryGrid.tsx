import React, { useEffect, useState, useMemo } from "react";
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

  // Debounced handleScroll function
  const handleScroll = debounce(() => {
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
  }, 100); // Adjust debounce delay (100ms in this case)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [photos.length, handleScroll]);

  // Slice the visible items
  const visiblePhotos = useMemo(
    () => photos.slice(0, endIndex),
    [endIndex, photos]
  );

  const handleLoadMore = () => {
    onLoadMore();
    setEndIndex((prevEndIndex) => Math.min(prevEndIndex + incrementStep));
  };

  return (
    // @TODO: move this to styled
    <div>
      <MasonryGrid photos={visiblePhotos} onPhotoClick={onPhotoClick} />
      {loading && <p>Loading...</p>}
      {showLoadMore && <button onClick={handleLoadMore}>Load More</button>}
    </div>
  );
};

export default VirtualizedMasonryGrid;
