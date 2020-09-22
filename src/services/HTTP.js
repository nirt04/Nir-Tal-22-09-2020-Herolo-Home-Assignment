import axios from 'axios';

const HTTP = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'development'
      ? '/'
      : '/',

  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const get = (route, params, config) => {
  return new Promise((resolve, reject) => {
    HTTP.get(route, { params })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const post = async (route, params) => {
  return new Promise((resolve, reject) => {
    HTTP.post(route, params).then(res => {
      resolve(res);
    });
  });
};

const put = async (route, params) => {
  return new Promise((resolve, reject) => {
    HTTP.put(route, params).then(res => {
      resolve(res);
    });
  });
};

// request interceptor
HTTP.interceptors.request.use(
  config => {
    // config.headers["HEADER-NAME"]
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// response interceptor
HTTP.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log('error', error);
    return Promise.reject(error);
  },
);

export default {
  get,
  put,
  post,
};
