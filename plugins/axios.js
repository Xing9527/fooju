import axios from 'axios'
import Vue from "vue"
import qs from "qs"


let options = {
    baseURL: `http://localhost:3000/api/fjw`,
    // baseURL: `http://www.fooju.cn/fjw`,
    // timeout: 15000,
    headers: {"Content-Type": "application/x-www-form-urlencoded"}
}
// The server-side needs a full url to works
// if (process.server) {
//   // options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
//
// }
let xhr = {
    get(url, params) {
        return new Promise((resolve, reject) => {
            axios.create(options).get(url, {params}).then(res => {
                resolve(res)
            }).catch(err => {
                // console.log(err)
                reject(err)
            })
        })
    },
    post(url, params) {
        return new Promise((resolve, reject) => {
            params = qs.stringify(params)
            axios.create(options).post(url, params).then(res => {
                resolve(res)
            }).catch(err => {
                // console.log(err)
            })
        })
    }
}

Vue.prototype.$axios = xhr;
export default axios.create(options)
