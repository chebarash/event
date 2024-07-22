import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";
import useToast from "./useToast";

const useAxios = <T>(config: AxiosRequestConfig & { manual?: boolean }) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const fetchData: (params?: {
    [name: string]: any;
  }) => Promise<T | null> = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      config.headers = {
        Authorization: window.Telegram.WebApp.initDataUnsafe.user?.id,
      };
      config.params = { ...config.params, ...params };
      const response: AxiosResponse<T> = await axiosInstance.request<T>(config);
      setData(response.data);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast(err.response?.data.message || err.message);
        if (err.message == `Network Error`) return await fetchData();
        setError(err.response?.data.message || err.message);
      } else {
        toast(`An unexpected error occurred`);
        setError(`An unexpected error occurred`);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!config.manual) fetchData();
  }, []);

  return { data, error, loading, fetchData };
};

export default useAxios;
