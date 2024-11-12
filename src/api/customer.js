import request from '@/utils/request'

const customer = {
    getCustomerData() {
        return request({
            url: '/api/customer/getlist/',
            // method: 'POST',
            // data:{}
        })
    }
}

export default customer