import axios from "axios";

const API_KEY = import.meta.env.VITE_PEXELS_KEY;
const BASE_URL = import.meta.env.VITE_PEXELS_BASE_URL;

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: API_KEY,
  },
});
