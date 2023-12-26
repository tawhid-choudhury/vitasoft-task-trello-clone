import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVERLINK}`,
});

export default axiosInstance;
