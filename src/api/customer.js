import request from '@/utils/request'

const customer = {
    getCustomerData(currentPage, pageSize, dataType) {
        return request({
            url: '/api/customer/getlist.php',
            method: 'POST',
            data: { currentPage, pageSize, dataType }
        })
    },
    approveCustomer(id, result, reason = '') {
        return request({
            url: '/api/customer/approve.php',
            method: 'POST',
            data: { id, result, reason }
        })
    },
    resetStatus(id) {
        return request({
            url: '/api/customer/resetstatus.php?id=' + id,
        })
    },
    search(content, condition, dataType, scope) {//content 搜索内容，condition 条件,dataType 所在页面类型，在哪个页面搜索（first,renewal,end)
        return request({
            url: '/api/customer/search.php',
            method: 'POST',
            data: { content, condition, dataType, scope }
        })
    },
    batch_pass(data) {
        return request({
            url: '/api/customer/batch_pass.php',
            method: 'POST',
            data
        })
    }

}

export default customer