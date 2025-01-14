import request from '@/utils/request'

const sales = {
    addCustomer(data) {
        return request({
            url: '/api/sales/addcustomer.php',
            method: 'POST',
            data
        })
    },
    getSalesCustomerList(userId, currentPage, pageSize) {
        return request({
            url: '/api/sales/getsalescustomerlist.php',
            method: 'POST',
            data: { userId, currentPage, pageSize }
        })
    },
    delayCustomer(id, delayreason) {
        return request({
            url: '/api/sales/delaycustomer.php',
            method: 'POST',
            data: { id, delayreason }
        })
    },
    deleteCustomer(data) {
        return request({
            url: '/api/sales/deletecustomer.php',
            method: 'POST',
            data
        })
    }
}

export default sales