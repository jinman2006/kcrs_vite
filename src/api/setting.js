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
    }
}

export default setting