import request from '@/utils/request.js'

const role = {
    getRoles() {
        return request({
            url: '/api/role/getroles.php'
        })
    },
    setRoles(id, data) {
        return request({
            url: '/api/role/setroles.php',
            method: 'POST',
            data: { id: id, menus: data }
        })
    },
    addRoles(roleName, menus) {
        return request({
            url: '/api/role/addroles.php',
            method: 'POST',
            data: { rolename: roleName, menus: menus }
        })
    },
    delRoles(id) {
        return request({
            url: '/api/role/delroles.php',
            method: 'POST',
            data: { id: id }
        })
    }
}


export default role