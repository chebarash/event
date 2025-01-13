import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import useToast from "./useToast";
import axiosInstance from "./axiosInstance";

const useAxios = <T>(config: AxiosRequestConfig & { manual?: boolean }) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const fetchData = useCallback(
    async (
      localConf: AxiosRequestConfig = { params: {}, data: {} }
    ): Promise<T | null> => {
      setLoading(true);
      setError(null);
      try {
        const conf = { ...config, ...localConf };
        conf.headers = window.Telegram.WebApp.initData.length
          ? {
              Authorization: `tma ${window.Telegram.WebApp.initData}`,
            }
          : {};
        const response: AxiosResponse<T> = await axiosInstance.request<T>(conf);
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
    },
    [config, toast]
  );

  useEffect(() => {
    if (!config.manual && window.Telegram.WebApp.initData.length) fetchData();
  }, []);

  return { data, error, loading, fetchData };
};

export default useAxios;
