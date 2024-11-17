import request from '@/utils/request'

const customer = {
    getCustomerData(currentPage, pageSize) {
        return request({
            url: '/api/customer/getlist.php',
            method: 'POST',
            data:{currentPage, pageSize}
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
    },
    search(content, condition){
        return request({
            url: '/api/customer/search.php',
            method: 'POST',
            data: {content, condition}
        })
    }

}

export default customer