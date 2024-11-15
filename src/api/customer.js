import request from '@/utils/request'

const customer = {
    getCustomerData() {
        return request({
            url: '/api/customer/getlist.php',
            // method: 'POST',
            // data:{}
        })
    },
    approveCustomer(id, result, reason = '') {
        return request({
            url: '/api/customer/approve/',
            method: 'POST',
            data: { id, result, reason }
        })
    },
    resetStatus(id) {
        return request({
            url: '/api/customer/resetstatus.php?id=' + id,
        })
    }

}

export default customer