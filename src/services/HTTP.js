import axios from "axios";
const CancelToken = axios.CancelToken;
const cancelTokens = {};

const HTTP = axios.create({
  baseURL: "http://dataservice.accuweather.com/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  params: {
    apikey: "JpXZNXKBXpKo5VVG0RZzybpKahdMX8vv",
  },
});

const get = (route, params, config = {}) => {
  return new Promise((resolve, reject) => {
    debugger;
    if (cancelTokens[config.cancelToken]) cancelTokens[config.cancelToken]("Request canceled.");

    HTTP.get(route, {
      params,
      cancelToken: config.cancelToken
        ? new CancelToken((c) => (cancelTokens[config.cancelToken] = c))
        : null,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const post = async (route, params) => {
  return new Promise((resolve, reject) => {
    HTTP.post(route, params).then((res) => {
      resolve(res);
    });
  });
};

const put = async (route, params) => {
  return new Promise((resolve, reject) => {
    HTTP.put(route, params).then((res) => {
      resolve(res);
    });
  });
};

// request interceptor
HTTP.interceptors.request.use(
  (config) => {
    // config.headers["HEADER-NAME"]
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// response interceptor
HTTP.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("error", error);
    return Promise.reject(error);
  }
);

export default {
  get,
  put,
  post,
};
