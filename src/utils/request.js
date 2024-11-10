/**
 * 封装axios
 * author:king
 * date:2024-11-08
 */
import axios from 'axios'


const axiosInstance = axios.create({
    
    // baseURL: http://127.0.0.1
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000
})

// 请求拦截器
axiosInstance.interceptors.request.use(
    config =>{
        console.log('request',config)
        // 请求前要做的动作
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
    response => {
        // 请求成功后，对响应数据做的处理

        // 返回的数据是axios.then(res)中接收的数据
        return res
    },
    error => {
        // 请求错误时要做的事

        // 该返回的数据是axios.catch(err)中接收的数据
        return Promise.reject(error)
    }
)

export default axiosInstance