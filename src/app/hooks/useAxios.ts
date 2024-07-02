import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";
import useToast from "./useToast";

const useAxios = <T>(config: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData: () => Promise<void> = async () => {
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
        if (axios.isAxiosError(err)) {
          toast(err.response?.data.message || err.message);
          if (err.message == `Network Error`) return await fetchData();
          setError(err.response?.data.message || err.message);
        } else {
          toast(`An unexpected error occurred`);
          setError(`An unexpected error occurred`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, loading };
};

export default useAxios;
