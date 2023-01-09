/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
import {shallowRef} from "@vue/reactivity"
import {mapinfo} from "@/utils/map/map"
const state = {
  Amap: shallowRef(null),
}
const mutations = {
  SET_Amap: (state, Amap) => state.Amap = Amap,
}
const actions = {
  AmapInit({
    state,
    commit
  }) {
    return new Promise(async (resolve, reject) => {
      commit("SET_Amap", null)
      try {
        var amap= new mapinfo()
        commit("SET_Amap", amap)
        resolve(amap)
      } catch (e) {
      }
    })
  },
}




export default {
  namespaced: true,
  state,
  mutations,
  actions
}

