/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
import { createStore } from 'vuex'
import getters from"./gettre"
import baseinfo from"./modules/baseinfo"
import userinfo from"./modules/userinfo"
import map from"./modules/map"
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    baseinfo,
    userinfo,
    map,
  },
  getters
})


