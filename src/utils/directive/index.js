/*
 * @name: 自定义指令配置
 * @description: 自定义指令配置
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */

// 验证权限
import {has} from '@/utils/directive/extend/permissions.js';
import {copy} from '@/utils/directive/extend/copy.js';
import {debounce} from '@/utils/directive/extend/debounce.js';
import {draggable} from '@/utils/directive/extend/draggable.js';
import {emoji} from '@/utils/directive/extend/emoji.js';
import {LazyLoad} from '@/utils/directive/extend/LazyLoad.js';
import {waterMarker} from '@/utils/directive/extend/waterMarker.js';
import {maxImg} from '@/utils/directive/extend/maxImg.js';



const directives = {
    has,  
    copy,  
    debounce,  
    draggable,  
    emoji,  
    LazyLoad,  
    waterMarker,  
    maxImg,  
};



// 批量注册指令
export default {
    install(Vue) {
        Object.keys(directives).forEach((key) => {
            Vue.directive(key, directives[key]);
        });
    },
};


// app.directive('focus', {
//     created() {
//       console.log('在绑定元素的属性前，或者事件监听器应用前调用');
//     },
//     beforeMount() {
//       console.log('在元素被插入到DOM前调用，例如我们想要实现输入框的自动聚焦，就不能在beforeMount钩子中实现');
//     },
//     mounted() {
//       console.log('在绑定元素的父组件以及自己的所有子节点都挂载完毕后调用，这个时候DOM已经渲染出来，我们实现输入框自动聚焦也是在这个钩子函数中实现');
//     },
//     beforeUpdate() {
//       console.log('绑定元素的父组件更新前调用');
//     },
//     updated() {
//       console.log('在绑定元素的父组件以及自己的所有子节点都更新完毕后调用');
//     },
//     beforeUnmount() {
//       console.log('绑定元素的父组件卸载前调用');
//     },
//     unmounted() {
//       console.log('绑定元素的父组件卸载后调用');
//     }
//   })



// 从 vue2 升级到 vue3 ，自定义指令的生命周期钩子函数发生了改变，具体变化如下：

// bind 函数被替换成了beforeMounted。

// update 被移除。

// componentUpdated 被替换成了updated。

// unbind 被替换成了 unmounted。

// inserted 被移除。




// 自定义指令钩子函数的参数
// 钩子函数被赋予了以下参数：

// el：指令所绑定的元素，可以直接操作DOM。

// binding：是一个对象，包含该指令的所有信息。

// binding 包含的属性具体的分别为：

// arg 自定义指令的参数名。

// value 自定义指令绑定的值。

// oldValue 指令绑定的前一个值。

// dir 被执行的钩子函数

// modifiers：一个包含修饰符的对象