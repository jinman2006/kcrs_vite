import request from '@/utils/request.js'

const user = {
    // 用户登录 
    login(username,password) {
        return request({
            url:'/api/login/',
            method: 'POST',
            data: {username,password}
        })
    },
    // 用户登出
    logout() {

    },
    getuserlist(){
        return request({
            url:'/api/user/getuserlist.php',
            method: 'POST',
            data:{}
        })
    }
}

export default user