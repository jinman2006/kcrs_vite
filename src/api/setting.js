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
    }
}

export default setting