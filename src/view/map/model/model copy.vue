<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-02 12:49:55
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div>
        <div ref="yourModal"></div>
        <a-modal 
            v-model:visible="visible"  width="16rem"
            height="80%" :footer="null"
            :title="info.title"  
            class="demo-modal"
            :getContainer="() => $refs.yourModal"
            @ok="handleOk">
          <component ref="componentRef" :is="components.get(componentName)" :infos="info" style="height:100%"></component>
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
            const components = new Map()
            components.set(
                'carList',
                defineAsyncComponent(() => import('@/views/homeInfo/model/modelExtend/carList')),
            ); 
            components.set(
                'errorList',
                defineAsyncComponent(() => import('@/views/homeInfo/model/modelExtend/errorList')),
            );
            components.set(
                'tipsList',
                defineAsyncComponent(() => import('@/views/homeInfo/model/modelExtend/tipsList')),
            );
            const visible = ref (false);
            const info = ref ({});
            const componentRef=ref(null)
            const componentName = ref("")
            const showModal = () => {
                visible.value = true;
            };
            const handleOk = (e) => {
                console.log(e);
                visible.value = false;
            };

            onMounted(()=>{
                emitter.on("showModel",(infos)=>{
                    console.log(infos)
                    visible.value=true
                    info.value=infos
                    componentName.value=infos.view
                })
            })
            return {
                visible,
                info,
                components,
                componentName,
                componentRef,
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