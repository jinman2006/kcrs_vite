// 全局路由前置守卫
import router from './router/index'
import { useUserStore } from './store/user'

let currentTime = Math.floor(Date.now() / 1000) //当前时间


router.beforeEach((to, from) => {
    try {
        const userStore = useUserStore()
        // token、expireTime存在且expireTime未过期
        if ((userStore.data.expireTime && userStore.data.expireTime > currentTime) && userStore.data.token) {
            if (to.path === '/login') {
                return '/'
            }
            // console.log(111)
            // console.log(currentTime)
        } else {
            console.log(222)
        }
        // userStore.getUserInfo('user')
        // console.log('router', userStore.data.username)

    } catch (error) {
        throw error
    }
})