import React, { useState } from "react";
import MasonryGrid from "../components/MasonryGrid";
import { Photo } from "../types/Photo";
import { useNavigate } from "react-router-dom";
import { usePhotos } from "../hooks/usePhotos";

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const { photos, loading } = usePhotos("nature", page, 20);
  const navigate = useNavigate();

  const handlePhotoClick = (photo: Photo) => {
    navigate(`/photo/${photo.id}`, { state: { photo } });
  };

  return (
    <div>
      <MasonryGrid photos={photos} onPhotoClick={handlePhotoClick} />
      {loading && <p>Loading...</p>}
      <button onClick={() => setPage((prev) => prev + 1)}>Load More</button>
    </div>
  );
};

export default Home;
