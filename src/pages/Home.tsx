import React, { useEffect, useState } from "react";
import { Photo } from "../types/Photo";
import { useNavigate } from "react-router-dom";
import { usePhotos } from "../hooks/usePhotos";
import VirtualizedMasonryGrid from "../components/VirtualizedMasonryGrid";
import { debounce } from "../utils/debounce";

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(""); // Initial search query
  const [debouncedQuery, setDebouncedQuery] = useState(query); // Debounced query
  const { photos, loading, error, total } = usePhotos(
    debouncedQuery,
    page,
    100
  );
  const navigate = useNavigate();

  const handlePhotoClick = (photo: Photo) => {
    navigate(`/photo/${photo.id}`, { state: { photo } });
  };

  useEffect(() => {
    const handler = debounce((q: string) => setDebouncedQuery(q), 300); // Debounce delay of 300ms
    handler(query);

    return () => handler.cancel?.(); // Cleanup debounce on unmount
  }, [query]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setQuery(e.target.value); // Update query on input change
  };

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
        onLoadMore={() => setPage((prev) => prev + 1)}
        photos={photos}
        onPhotoClick={handlePhotoClick}
        loading={loading}
        showLoadMore={total !== 0 || total < photos.length}
      />
    </div>
  );
};

export default Home;
