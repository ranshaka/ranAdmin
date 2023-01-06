/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
/*
 * @name: 权限判定
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
//先获取本地权限数据 permissions 
import store from "@/store";
import {
    computed,
} from "@vue/reactivity";
const permissions=computed(()=>store.getters.authority)

export const has = {
    mounted (el, binding, vnode) {
        const value = binding.value
        let hasBtn = permissions.value.includes(value);
        if (!hasBtn) {
            if (!el.parentNode) {
                el.style.display = 'none'
            } else {
                el.parentNode.removeChild(el)
            }
          }
    }
}
