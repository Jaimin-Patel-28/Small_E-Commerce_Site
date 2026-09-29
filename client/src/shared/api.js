import axios from "axios";

console.log("API URL:", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let accessToken = null;
export const setAccessToken = (token) => {
  accessToken = token;
};

api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    const skip = ["/auth/login", "/auth/refresh-token"];

    if (
      err.response?.status === 401 &&
      !original._retry &&
      !skip.includes(original.url)
    ) {
      original._retry = true;
      try {
        const { data } = await api.post("/auth/refresh-token");
        setAccessToken(data.accessToken);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch {
        setAccessToken(null);
      }
    }
    return Promise.reject(err);
  },
);

export default api;
