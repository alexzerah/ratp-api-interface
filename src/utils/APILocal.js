import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_LOCAL_URL
});

instance.interceptors.request.use(
    config => {
        if (localStorage.getItem("token")) {
            config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

instance.defaults.headers['Content-Type'] = 'application/json';
instance.defaults.timeout = 3000;

export default instance;
