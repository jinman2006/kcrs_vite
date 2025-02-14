import request from '@/utils/request.js'

const role = {
    getRoles() {
        return request({
            url: '/api/role/getroles.php'
        })
    }
}


export default role