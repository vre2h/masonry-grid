import { useState, useEffect } from "react";
import { Photo } from "../types/Photo";
import { fetchPhotos } from "../services/photos";

export const usePhotos = (query: string, page: number, perPage: number) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPhotos(query, page, perPage);
        setPhotos((prev) => [...prev, ...data.photos]);
      } catch (err: unknown) {
        // @TODO: add logger
        console.error(err);
        setError("Failed to load photos");
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, [query, page, perPage]);

  return { photos, loading, error };
};
