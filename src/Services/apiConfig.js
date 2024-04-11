import axios from "axios";

const getToken = () => {
  return new Promise((resolve) => {
    const token = localStorage.getItem("token");
    resolve(token ? `Bearer ${token}` : null);
  });
};

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
    ? "Add Heroku Link Here"
    : "http://localhost:8000",
  })

  api.interceptors.request.use(
    async function (config) {
      const token = await getToken()
      if (token) {
        config.headers["Authorization"] = await getToken();
      }
      return config;
    },
    function (error) {
      console.log("Request error: ", error);
      return Promise.reject(error);
    }
  );

export default api;

