import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

const useAxios = <T>(config: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        config.headers = {
          Authorization: window.Telegram.WebApp.initDataUnsafe.user?.id,
        };
        const response: AxiosResponse<T> = await axiosInstance.request<T>(
          config
        );
        setData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) setError(err.message);
        else setError(`An unexpected error occurred`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, loading };
};

export default useAxios;
