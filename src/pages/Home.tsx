import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Photo } from "../types/Photo";
import { useNavigate } from "react-router-dom";
import { usePhotos } from "../hooks/usePhotos";
import VirtualizedMasonryGrid from "../components/VirtualizedMasonryGrid";
import { debounce } from "../utils/debounce";

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(""); // Initial search query
  const [debouncedQuery, setDebouncedQuery] = useState(query); // Debounced query
  const { photos, loading, error, total } = usePhotos(debouncedQuery, page, 20);
  const navigate = useNavigate();

  // Debounce query changes
  useEffect(() => {
    const handler = debounce((q: string) => setDebouncedQuery(q), 300);
    handler(query);

    return () => handler.cancel?.(); // Cleanup debounce on unmount
  }, [query]);

  // Handle input change (memoized to prevent unnecessary renders)
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setQuery(e.target.value);
    },
    []
  );

  // Navigate to photo detail (memoized to avoid re-renders in child components)
  const handlePhotoClick = useCallback(
    (photo: Photo) => {
      navigate(`/photo/${photo.id}`, { state: { photo } });
    },
    [navigate]
  );

  const handleLoadMore = () => setPage((prev) => prev + 1);

  // Calculate whether to show the "Load More" button (memoized for efficiency)
  const showLoadMore = useMemo(
    () => total !== 0 && photos.length < total,
    [total, photos.length]
  );

  return (
    <div>
      <h1>Masonry Grid</h1>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search photos..."
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "300px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {((photos.length === 0 && !loading) || error) && (
        <p>No photos found for "{query}"</p>
      )}

      <VirtualizedMasonryGrid
        onLoadMore={handleLoadMore}
        photos={photos}
        onPhotoClick={handlePhotoClick}
        loading={loading}
        showLoadMore={showLoadMore}
      />
    </div>
  );
};

export default Home;
