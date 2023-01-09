/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */

import {axiosPost,axiosGet} from '@/axios/axios.config'

/**
 * @description:  
 * @param {*} url
 * @param {*} configObj
 * @return {*}
 */
export function appLogin(url, configObj) {
    return  new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("成功")
        },200)
    })
}
