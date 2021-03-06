import axios from 'axios';

const { CancelToken } = axios;
const cancelTokens = {};

const HTTP = axios.create({
  baseURL: 'https://dataservice.accuweather.com/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  params: {
    apikey: 'A93ZHWxuSpGJ3A4OlGiTs7dWWgLLDRKD' || 'xFGvCy1FaaIkGtmG3Y3fLsuTE1lpdUVX'|| 'JpXZNXKBXpKo5VVG0RZzybpKahdMX8vv' || 'xFGvCy1FaaIkGtmG3Y3fLsuTE1lpdUVX' || 'rahPnD6qt8hT5e5c1tyfpo5SG51pefEB' || 'nHz7ILclGvWOyqQQA7y3kASkAan1oQ34' || 'yorJNfSt5GWC6ym3UEo8WZGX0N5eyRhb' || 'CNaQZfKNEpgWU5zO2MM3GAUv6QkoeeGh' || 'nHz7ILclGvWOyqQQA7y3kASkAan1oQ34'
  },
});

const get = (route, params, config = {}) => new Promise((resolve, reject) => {
  if (cancelTokens[config.cancelToken]) cancelTokens[config.cancelToken]('Request canceled.');

  HTTP.get(route, {
    params,
    cancelToken: config.cancelToken ? new CancelToken((c) => (cancelTokens[config.cancelToken] = c)) : null,
  })
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      reject(err);
    });
});

const post = async (route, params) => new Promise((resolve, reject) => {
  HTTP.post(route, params).then((res) => {
    resolve(res);
  });
});

const put = async (route, params) => new Promise((resolve, reject) => {
  HTTP.put(route, params).then((res) => {
    resolve(res);
  });
});

// request interceptor
HTTP.interceptors.request.use(
  (config) =>
    // config.headers["HEADER-NAME"]
    config,
  (error) =>
    // Do something with request error
    Promise.reject(error),

);

// response interceptor
HTTP.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('error', error);
    return Promise.reject(error);
  },
);

export default {
  get,
  put,
  post,
};
