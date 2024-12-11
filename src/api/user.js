import request from '@/utils/request.js'

const user = {
    // 用户登录 
    login(username, password) {
        return request({
            url: '/api/login/',
            method: 'POST',
            data: { username, password }
        })
    },
    // 用户登出
    logout() {

    },
    getuserlist(currentPage, pageSize, type = 'user') {
        return request({
            url: '/api/user/getuserlist.php',
            method: 'POST',
            data: { currentPage, pageSize, type }
        })
    },
    getSaleManagerList() {
        return request({
            url: '/api/user/getsalemanagerlist.php'
        })
    },
    getAgentList() {
        return request({
            url: '/api/user/getagentlist.php'
        })
    },
    addUser(data) {
        return request({
            url: '/api/user/adduser.php',
            method: 'POST',
            data
        })
    }
}

export default user