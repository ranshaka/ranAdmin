/**
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */

import axios from 'axios'
import { ElMessage } from 'element-plus'


const service = axios.create({
    baseURL: "", // url拼接，鉴于目前系统存在多个地址，该参数设为空或者不写
    withCredentials: false, // 发送请求的时候是否携带cookie
    timeout: 60000 // 请求超时时间 单位毫秒
})


/**
 * 响应请求的拦截器
 */
 service.interceptors.response.use(
    ({
        data
    }) => {
        const {
            code,
            msg
        } = data
        if (code === 200) return data
        if (code === 401) ElMessage.error('Missing Token~')
        else if (code === 403) ElMessage.error('此接口无访问权限~');
        else  ElMessage.error(msg ? msg : '接口调用失败~');
        return Promise.reject(data)
    },
    reject => {
        ElMessage.error('请求失败~');
        return Promise.reject(reject)
    }
)

/**
 * 添加 XS-AUTH-TOKEN 到 headers
 * @param configObj
 */
 function addToken2Headers(configObj) {
    //如果有 XS-AUTH-REQ 或者 XS-AUTH-TOKEN
    if (configObj.headers['XS-AUTH-REQ']) return configObj
    if (configObj.headers['XS-AUTH-TOKEN']) return configObj
    //判断是否有 initialHeaderBaseStr
    const initialHeaderBaseStr = sessionStorage.getItem("initialHeaderBaseStr")
    if (initialHeaderBaseStr) configObj.headers['XS-AUTH-TOKEN'] = initialHeaderBaseStr
    return configObj
}



/**
 * @description:  axios get 请求
 * @param {*} url   接口请求提示
 * @param {*} params   接口请求参数
 * @param {*} configObj   配置参数
 * @return {*}  返回接口参数
 */

export function axiosPost(url, params, configObj = {
    headers: {}
}) {

    return new Promise((resolve, reject) => {
        service.post(url, params, addToken2Headers(configObj))
            .then(resolve, reject)
            .catch(reject)
    })
}

/**
 * @description:  axios get 请求
 * @param {*} url   接口请求提示
 * @param {*} configObj   配置参数
 * @return {*}  返回接口参数
 */
export function axiosgGet(url, configObj) {
    return new Promise((resolve, reject) => {
        service.get(url, addToken2Headers(configObj))
            .then(resolve, reject)
            .catch(reject)
    })
}

export default service