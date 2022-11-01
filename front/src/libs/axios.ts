import axios from "axios";

// axios middleware
const client = axios.create({
  baseURL: "http://localhost:8888",
});
client.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  // success
  function (response) {
    return response;
  },
  // failure
  async function (error) {
    const {
      config,
      response: { status },
    } = error;
    if (status === 419) {
      const originalRequest = config;
      const refreshToken = localStorage.getItem("refresh");
      if (!refreshToken) {
        return Promise.reject(error);
      }
      const response = await client.get("/login-check", {
        headers: {
          refresh: refreshToken,
        },
      });
      const { data } = response;

      client.defaults.headers.authorization = `${data.token.accessToken}`; // access
      localStorage.setItem("refresh", data.token.refreshToken); // refresh

      originalRequest.headers.authorization = data.token.accessToken; // origin request
      return client(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default client;
