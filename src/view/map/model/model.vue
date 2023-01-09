<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-07 16:59:42
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div>
        <div ref="yourModal"></div>
        <a-modal 
            v-model:visible="visible"  :width="widthHome"
            height="80%" :footer="null"
            :title="info.title"  
            class="demo-modal"
            :getContainer="() => $refs.yourModal"
            @ok="handleOk">
          <component ref="componentRef" :is="components[componentsIndex]" :infos="info" style="height:100%"></component>
        </a-modal>
    </div>
</template>
<script>
    import {
        ref,
        defineComponent,
        nextTick,
        onMounted,
        onBeforeUnmount,
        defineAsyncComponent,
    } from 'vue';
    import {shallowRef} from "@vue/reactivity"
     
   
    // var componentId=null
    export default defineComponent({
        name: 'BusinessManagement',
        components: {},
        setup() {
            const components = [
                defineAsyncComponent(() => import('@/views/homeInfo/model/modelExtend/carList')),
                defineAsyncComponent(() => import('@/views/homeInfo/model/modelExtend/errorList')),
                defineAsyncComponent(() => import('@/views/homeInfo/model/modelExtend/tipsList')),
                defineAsyncComponent(() => import('@/views/homeInfo/model/modelExtend/message')),
            ]
            const componentsIndex=ref(0)
            const visible = ref (false);
            const info = ref ({});
            const componentRef=ref(null)
            const showModal = () => {
                visible.value = true;
            };
            const handleOk = (e) => {
                visible.value = false;
            };
            const widthHome=ref('16rem')
            onMounted(()=>{
                emitter.on("showModel",(infos)=>{
                    visible.value=true
                    info.value=infos
                    widthHome.value=infos.width || '16rem'
                    componentsIndex.value=infos.index
                })
            })
            return {
                visible,
                info,
                components,
                componentsIndex,
                componentRef,
                widthHome,
                showModal,
                handleOk,
            };
        },
    });
</script>
<style lang="less" scoped>
//     /deep/ .ant-modal {
//   width: 500px !important;
// }
</style>