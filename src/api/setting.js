import request from '@/utils/request'

const setting = {
    saveNotice(content) {
        console.log(content)
        return request({
            url: '/api/setting/savenotice.php',
            method: 'POST',
            data: { content }
        })
    },
    getNotice() {
        return request({
            url: '/api/setting/getnotice.php'
        })
    },
    saveEmailConfig(data) {
        return request({
            url: '/api/setting/saveemailconfig.php',
            method: 'POST',
            data
        })
    },
    getEmailConfig() {
        return request({
            url: '/api/setting/getemailconfig.php'
        })
    },
    saveEmailList(data) {
        return request({
            url: '/api/setting/saveemaillist.php',
            method: 'POST',
            data
        })
    },
    getEmailList() {
        return request({
            url: '/api/setting/getemaillist.php',
        })
    },
    saveValidPeriod(day) {
        return request({
            url: '/api/setting/savevalidperiod.php',
            method: 'POST',
            data: { validperiod: day }
        })
    },
    getValidPeriod() {
        return request({
            url: '/api/setting/getvalidperiod.php'
        })
    }
}

export default setting