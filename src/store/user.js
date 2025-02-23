import { reactive } from "vue"
import { defineStore } from "pinia"

const PERSIST_KEY = 'user'
const useUserStore = defineStore(PERSIST_KEY, () => {
    const data = reactive({
        username: '',
        token: '',
        expireTime: ''
    })

    const save = (username, token, expireTime) => {
        data.username = username
        data.token = token
        data.expireTime = expireTime
    }

    // 添加退出登录方法
    const logout = () => {
        // 重置状态
        data.username = '';
        data.token = '';
        data.expireTime = '';
        // 手动删除 localStorage 中的持久化数据
        // localStorage.removeItem(PERSIST_KEY);
    };

    return {
        data,
        save,
        logout // 导出退出登录方法
    }
},
    {
        persist: true
    })

export { useUserStore }