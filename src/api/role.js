import request from '@/utils/request.js'

const role = {
    getRoles() {
        return request({
            url: '/api/role/getroles.php'
        })
    },
    setRoles(id,data){
        return request({
            url:'/api/role/setroles.php',
            method: 'POST',
            data: {id:id,menus:data}
        })
    }
}


export default role