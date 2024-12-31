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
    },
    addManager(data) {
        return request({
            url: '/api/user/addmanager.php',
            method: 'POST',
            data
        })
    },
    modifyUser(data) {
        return request({
            url: '/api/user/modifyuser.php',
            method: 'POST',
            data
        })
    },
    lockUser(data) {
        return request({
            url: '/api/user/lockuser.php',
            method: 'POST',
            data: { o_no: data, action: 'lock' }
        })
    },
    unlockUser(data) {
        return request({
            url: '/api/user/lockuser.php',
            method: 'POST',
            data: { o_no: data, action: 'unlock' }
        })
    },
    resetPassword(data) {
        return request({
            url: "/api/user/resetpassword.php",
            method: 'POST',
            data: { o_no: data }
        })
    },
    changePassword(data) {
        return request({
            url: '/api/user/changepassword.php',
            method: 'POST',
            data
        })
    },
    delUser(data) {
        return request({
            url: "/api/user/deluser.php",
            method: 'POST',
            data: { o_no: data }
        })
    }
}

export default user