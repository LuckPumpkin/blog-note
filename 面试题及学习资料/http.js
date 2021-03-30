/*
 * @Descripttion: 
 * @version: 
 * @Author: yanan.zhao
 * @Date: 2020-04-30 18:12:41
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2020-04-30 18:51:59
 */
import axios from 'axios'
import {baseURL}  from '@/api/api.js'
import { getStore } from '@/config/mUtils.js'
import qs from 'qs'

const service = axios.create({
    baseURL: baseURL,  // 项目baseApi
    timeout: 50000,  // 超时时间
    withCredentials: true, // 携带cookie
})


/**
 * @Authorization 后端返回token
 * @require 请求拦截
 */
service.interceptors.request.use(
    config => {
        config.headers[Authorization] = getStore('token')? JSON.parse(getStore('token')) : ''
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        if(config.method.toLocaleUpperCase() === 'GET' || config.method.toLocaleUpperCase() === 'DELETE') {
            config.params = {
                ...config.params
            }
        } else {
            config.data = {
                ...config.data
            }
        }
        return config
    },
    err=> {
        return Promise.reject(err)
    }
)

/**
 * @response 返回拦截
 */
service.interceptors.response.use(
    response=> {
        if(response.status === 200) {
            return response.data || response.data.data
        } else {
            return Promise.reject(new Error('请求失败了！'))
        }
    },
    err=> {
        return Promise.reject(err)
    }
)

/**
 * 
 */
export const Http = (url, method, param) => {
    const baseParam = {
        url: baseURL+url,
        method: method,
        params: method.toLocaleUpperCase() === 'GET' || method.toLocaleUpperCase() === 'DELETE' ? params : '',
        data: method.toLocaleUpperCase() === 'POST' || method.toLocaleUpperCase() === 'PUT' ? qs.stringify(params) : ''
    }
    return new Promise((resolve, reject)=>{
        axios(baseParam).then((res)=>{
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}