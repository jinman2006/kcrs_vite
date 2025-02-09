/**
 * 封装axios
 * author:king
 * date:2024-11-08
 */
import axios from 'axios'
import { useUserStore } from '@/store/user'
import { ElMessage } from 'element-plus'
// import { useRouter } from "vue-router";
import router from "@/router"//直接导入router 而不是使用router = userRouter()

const userStore = useUserStore()


const axiosInstance = axios.create({

    // baseURL: http://127.0.0.1
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000
})

// 请求拦截器
axiosInstance.interceptors.request.use(
    config => {
        if (config.url != '/api/login/') {
            config.headers.token = userStore.data.token
            config.headers.username = userStore.data.username

        }
        console.log('request', config)
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
        const { data } = response

        if (data.success && data.code == 200) {
            return data
        } else if (data.code == 408) {
            ElMessage.error(data.message + 'here')
            setTimeout(() => {
                router.push("/login")
            }, 2000);

        }

        console.log('res', data)
        // 返回的数据是axios.then(res)中接收的数据
        return data
    },
    error => {
        // 请求错误时要做的事
        console.log('err', error)

        // 该返回的数据是axios.catch(err)中接收的数据
        return Promise.reject(error)
    }
)

export default axiosInstance