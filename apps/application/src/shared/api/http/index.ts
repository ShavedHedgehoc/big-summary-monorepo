import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiRoutes } from './apiRoutes';
import { AuthResponse } from '../services/auth-service';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const apiUrl = `/api`;

const $api = axios.create({
  withCredentials: true,
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

const $clearApi = axios.create({
  withCredentials: true,
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// $clearApi.interceptors.request.use(
//   function (config) {
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   },
// );

// $api.interceptors.request.use(
//   function (config) {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   },
// );

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// $api.interceptors.response.use(
//   function (config) {
//     return config;
//   },
//   async function (error) {
//     const originalRequest = error.config;
//     if (
//       originalRequest.url !== ApiRoutes.LOGIN &&
//       originalRequest.url !== ApiRoutes.LOGOUT &&
//       error.response
//     ) {
//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//           const response = await $clearApi.post(ApiRoutes.REFRESH);
//           localStorage.setItem('accessToken', response.data.accessToken);
//           return $api.request(originalRequest);
//         } catch (error) {
//           localStorage.removeItem('accessToken');
//           return Promise.reject(error);
//         }
//       }
//     }
//     return Promise.reject(error);
//   },
// );

$api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Проверяем, что это 401 ошибка и мы еще не пытались обновить токен
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      originalRequest.url !== ApiRoutes.LOGIN &&
      originalRequest.url !== ApiRoutes.REFRESH // Важно: не рефрешим, если упал сам рефреш
    ) {
      originalRequest._retry = true;

      try {
        // Делаем запрос на обновление
        const response = await $clearApi.post<AuthResponse>(ApiRoutes.REFRESH);
        const { accessToken } = response.data;

        localStorage.setItem('accessToken', accessToken);

        // ОБЯЗАТЕЛЬНО обновляем заголовок в упавшем запросе
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        // Повторяем запрос с новым токеном
        return $api(originalRequest);
      } catch (refreshError) {
        // Если рефреш не удался (например, сессия истекла)
        localStorage.removeItem('accessToken');

        // Здесь можно сделать window.location.href = '/login' или вызвать логаут
        // return Promise.reject(refreshError);
        // Внутри catch (error) {...}
        return Promise.reject(
          refreshError instanceof Error ? refreshError : new Error(String(refreshError)),
        );
      }
    }

    return Promise.reject(error);
  },
);

export { $api, $clearApi };
