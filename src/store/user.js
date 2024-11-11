import { reactive } from "vue"
import { defineStore } from "pinia"

const useUserStore = defineStore('user', () => {
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

    return {
        data,
        save
    }
},
    {
        persist: true
    })

export { useUserStore }