
// src/lib/axios.ts
// import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
// import { getAccessToken, getRefreshToken, setTokens, logout } from "@/features/auth/auth";

// const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// const axiosInstance: AxiosInstance = axios.create({
//     baseURL,
//     withCredentials: true, // nếu dùng cookie (có thể bỏ nếu không cần)
// });

// // Đính kèm access token trước mỗi request
// axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//     const token = getAccessToken();
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// // === Đặt biến toàn cục để xử lý queue refresh token
// let isRefreshing = false;
// let failedQueue: {
//     resolve: (token: string) => void;
//     reject: (err: any) => void;
// }[] = [];

// const processQueue = (error: any, token: string | null) => {
//     failedQueue.forEach(({ resolve, reject }) => {
//         if (token) resolve(token);
//         else reject(error);
//     });
//     failedQueue = [];
// };

// // === Xử lý refresh token nếu gặp lỗi 401
// axiosInstance.interceptors.response.use(
//     (res) => res,
//     async (error: AxiosError) => {
//         const originalRequest = error.config as any;

//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             if (isRefreshing) {
//                 // Nếu đang refresh, thêm request vào hàng đợi
//                 return new Promise((resolve, reject) => {
//                     failedQueue.push({
//                         resolve: (token: string) => {
//                             originalRequest.headers["Authorization"] = "Bearer " + token;
//                             resolve(axiosInstance(originalRequest));
//                         },
//                         reject: (err) => reject(err),
//                     });
//                 });
//             }

//             isRefreshing = true;

//             try {
//                 const refreshToken = getRefreshToken();
//                 const response = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });
//                 const newAccessToken = response.data.accessToken;
//                 const newRefreshToken = response.data.refreshToken;

//                 setTokens(newAccessToken, newRefreshToken);
//                 axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + newAccessToken;

//                 processQueue(null, newAccessToken);
//                 return axiosInstance(originalRequest);
//             } catch (err) {
//                 processQueue(err, null);
//                 logout();
//                 return Promise.reject(err);
//             } finally {
//                 isRefreshing = false;
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;




import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});
export default axiosInstance;


