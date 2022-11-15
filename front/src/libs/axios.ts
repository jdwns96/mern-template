import axios from "axios";
// @version axios "^0.19.2",
// 최신 버전 사용시 미들웨어 사용법이 달라짐, 해당 코드가 정상적으로 동작하지 않음

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
  },
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
    console.log(status);
    console.log(config);
    if (status === 419) {
      console.log("여긴 오냐?");
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
  },
);

export default client;
