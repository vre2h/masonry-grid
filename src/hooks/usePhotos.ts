import { useState, useEffect } from "react";
import { Photo } from "../types/Photo";
import { fetchPhotos } from "../services/photos";

export const usePhotos = (query: string, page: number, perPage: number) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPhotos(query, page, perPage);
        // If the query changes, reset the photos array
        setPhotos((prev) =>
          page === 1 ? data.photos : [...prev, ...data.photos]
        );
        setTotal(data.total_results);
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

  return { photos, loading, error, total };
};
