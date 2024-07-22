import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://event-api.chebarash.uz`,
  headers: {
    "Content-Type": `application/json`,
  },
});

const isDate = (value: any): boolean =>
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/.test(value);

const parseDates = (data: any): any => {
  if (Array.isArray(data)) return data.map((item) => parseDates(item));
  else if (typeof data === "object" && data !== null)
    for (const key in data)
      if (typeof data[key] === "string" && isDate(data[key]))
        data[key] = new Date(data[key]);
      else if (typeof data[key] === "object") data[key] = parseDates(data[key]);
  return data;
};

axiosInstance.interceptors.response.use(
  (response) => {
    response.data = parseDates(response.data);
    return response;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
