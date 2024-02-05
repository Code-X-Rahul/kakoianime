import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://kakoi-anime-backend.vercel.app",
});
