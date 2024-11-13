import request from '@/utils/request'

const customer = {
    getCustomerData() {
        return request({
            url: '/api/customer/getlist/',
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
    }
}

export default customer