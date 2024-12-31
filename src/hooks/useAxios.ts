import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import useToast from "./useToast";
import axiosInstance from "./axiosInstance";

const useAxios = <T>(config: AxiosRequestConfig & { manual?: boolean }) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const fetchData: (props?: {
    params?: { [name: string]: any };
    data?: { [name: string]: any };
  }) => Promise<T | null> = async (
    { params = {}, data = {} } = { params: {}, data: {} }
  ) => {
    setLoading(true);
    setError(null);
    try {
      config.headers = {
        Authorization: window.Telegram.WebApp.initDataUnsafe.user?.id,
      };
      config.params = { ...config.params, ...params };
      config.data = { ...config.data, ...data };
      const response: AxiosResponse<T> = await axiosInstance.request<T>(config);
      setData(response.data);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast(err.response?.data.message || err.message, true);
        if (err.message == `Network Error`) return await fetchData();
        setError(err.response?.data.message || err.message);
      } else {
        toast(`An unexpected error occurred`, true);
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
