import { axiosClient } from "../libs/axios";

export const fetchPhotos = async (
  query: string,
  page: number,
  perPage: number
) => {
  const response = await axiosClient.get(query ? "search" : "curated", {
    params: { query, page, per_page: perPage },
  });
  return response.data;
};
