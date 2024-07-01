import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://event-api.chebarash.uz`,
  headers: {
    "Content-Type": `application/json`,
  },
});

export default axiosInstance;
