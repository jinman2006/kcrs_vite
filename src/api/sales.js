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
    }
}

export default sales