import Vue from 'vue'
import axios from 'axios'

const service = axios.create({
    baseURL: '/api'
})

// 请求拦截

// 响应拦截
service.interceptors.response.use(response => {
    console.log(response)

    return response.data
})

Vue.prototype.$http = service

export const http = service