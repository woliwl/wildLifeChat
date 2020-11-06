// 封装uni-request
import uniRequest from 'uni-request';
// let baseURL = 'http://47.98.197.112:8364'
let baseURL = 'http://127.0.0.1:8364'

function request(options) {
    let headers = {
        "Content-Type":"application/json"
    }
    return new Promise((res,rej) =>{
        uni.request({
            url:baseURL + options.url,
            method:options.method || 'GET',
            data:options.data,
            header:headers,
            success(data) {
                res(data)
            },
            fail() {
                rej()
            }
        })
    })
}

export default request;