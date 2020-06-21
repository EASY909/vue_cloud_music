import axios from 'axios'
// const BASEURL=process.env.NODE_ENV === 'production' ?'':'/devApi';
export const BASEURL = 'http://localhost:4000';

const axiosInstance = axios.create({
    baseURL: BASEURL,
    timeout: 15000,
});
// 添加请求拦截器
axiosInstance.interceptors.request.use(function (config) {

    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(
    res => res.data,
    err => {
        console.log(err, "网络错误");
    });


    

export default axiosInstance;