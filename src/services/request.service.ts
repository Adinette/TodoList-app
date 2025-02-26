import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { UseMutationOptions } from '@tanstack/vue-query';
import axios, { type AxiosRequestConfig } from "axios";

export default function requestService({
  urlKey,
  alertNotification,
}: {
  urlKey?: string;
  alertNotification?: boolean;
}) {

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    timeout: 60000,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      if (alertNotification) (response.data.message);
      return response.data;
    },
    (error) => {
      const status = error.response?.status;
      const message = error.response?.data?.message || 'Une erreur est survenue';
      if (alertNotification || status === 401) (message);
      if (status === 401) {
        window.location.href = '/sign-in';
      }
      return Promise.reject(error.response?.data?.errors || {});
    }
  );

  function formatUrl(crud = '') {
    return urlKey ? `${urlKey}${crud ? `/${crud}` : ''}` : `${crud}`;
  }

  function get(crud = '', params = {}) {
    return axiosInstance.get(formatUrl(crud), { params });
  }

  function post(crud = '', body = {}) {
    return axiosInstance.post(formatUrl(crud), body);
  }

  function put(crud = '', body = {}) {
    return axiosInstance.put(formatUrl(crud), body);
  }

  function patch(crud = '', body = {}) {
    return axiosInstance.patch(formatUrl(crud), body);
  }

  function del(crud = '') {
    return axiosInstance.delete(formatUrl(crud));
  }

  function usePostQuery(
    key: string,
    url: string = "",
    mutableKeys: object,
    config?: AxiosRequestConfig<void>,
    mutationOptions?: UseMutationOptions<any, any, any, any>
  ) {
    const queryClient = useQueryClient();

    return useMutation(
      {
        mutationKey: [key, mutableKeys],
        mutationFn: async (body) =>
          axiosInstance.post(`${key}/${url}`, body, config),
        ...mutationOptions,
      },
      queryClient
    );
  }

  return {
    get,
    post,
    put,
    del,
    patch,
    usePostQuery,
  };
}
