<template>
    <div class="contnt">

    </div>
</template>

<script>
    import {
        computed,
        defineComponent,
        onMounted, //响应式
        ref,
        watch,
        nextTick
    } from 'vue';
    import {
        useStore
    } from "vuex";
    import {markerList} from "@/view/map/map.js"
    export default defineComponent({
        components: {

        },
        setup() {
            const store=useStore()
            const map=computed(()=>store.state.map.Amap)
            // onMounted(()=>{
            //     setTimeout(()=>{
            //         addMarker(markerList)
            //     },200)
               
            // })
            // const styleList=[
            //     new AMap.Icon({
            //         image: require("@/view/map/images/1.png"),
            //         size: new AMap.Size(22, 22), //图标大小
            //         imageSize: new AMap.Size(22, 22)
            //     }),
            //     new AMap.Icon({
            //         image: require("@/view/map/images/3.png"),
            //         size: new AMap.Size(22, 22), //图标大小
            //         imageSize: new AMap.Size(22, 22)
            //     }),
            //     new AMap.Icon({
            //         image: require("@/view/map/images/2.png"),
            //         size: new AMap.Size(30, 30), //图标大小
            //         imageSize: new AMap.Size(30, 30)
            //     }),
            // ]
             // 添加撒点
             const addMarker = (list) => {
                let carlist = map.value.getMarker('carlist')
                if (carlist && carlist.length) {
                    map.value.amap.remove(carlist.map(x => x.value))
                }
                let result = []
                for (let i = 0; i < list.length; i++) {
                    if (list[i].lnglat) {
                        let marker = new AMap.Marker({
                            position: new AMap.LngLat(list[i].lnglat[0], list[i].lnglat[1]),
                            icon: styleList[list[i].style],
                            offset: new AMap.Pixel(-30, -30),
                            extData: list[i],
                        });
                        result.push({
                            value: marker,
                            keys: list[i].name,
                            style:list[i].style,
                        })
                        marker.on('click', function (e) {
                            clickMarker(list[i], e)
                        })
                    }
                }
                map.value.setMarker("carlist", result)
                console.log(map.value)
                map.value.amap.add(result.map(x => x.value))
            }

                // 切换撒点
            const switchMarker=(list)=>{
                let carlist = map.value.getMarker('carlist')
                if(allMarkerFlash && allMarkerFlash.length){
                        map.value.amap.remove(allMarkerFlash.map(x=>x.value))
                        cleckMarkerFlash=[]
                    }
                if (!carlist && !carlist.length)return;
                for(let i=0;i<carlist.length;i++){
                    if(list.some(x=>x.name == carlist[i].keys)){
                        carlist[i].value.show()
                    }else{
                        carlist[i].value.hide()
                    }
                }
            }

            // 选中maker 的闪烁效果
            var cleckMarkerFlash = null
            const clickMarker = (info) => {
                let carlist = map.value.getMarker('carlist')
                for (let i = 0; i < carlist.length; i++) {
                    if (carlist[i].keys == info.name) {
                        //自定义覆盖物
                        if (cleckMarkerFlash) {
                            map.value.amap.remove(cleckMarkerFlash)
                        }
                        cleckMarkerFlash = addMarkerFlash([{name:info.name,LngLat:info.lnglat,}])[0].value
                        carlist[i].value.setIcon(styleList[2])
                    } else {
                        carlist[i].value.setIcon(styleList[carlist[i].style])
                    }
                }
            }

            // 添加选中
            var allMarkerFlash = []
            const OPERATION = (query) => {
                car_scatterer({
                    "type": "OPERATION",
                    ...query
                }).then((res) => {
                    if (res.code == 200) {
                        let data = JSON.parse(res.data)
                        let result = data.data.result
                        let array = result.map(x => {
                            return {
                                ...x,
                                LngLat: WGS842GCJ022(x.WX, x.WY),
                                style: 4
                            }
                        })
                        if (allMarkerFlash) {
                            map.value.amap.remove(allMarkerFlash.map(x=>x.value))
                        }
                        allMarkerFlash=addMarkerFlash(array)
                    }
                })
            }

            // marker添加闪光点
            const addMarkerFlash=(array)=>{
                let result=[]
                for (let i = 0; i < array.length; i++) {
                            let text = new AMap.Text({
                                map: map.value.amap,
                                text: ' ',
                                textAlign: 'center',
                                verticalAlign: 'middle', //middle 、bottom
                                draggable: true,
                                cursor: 'pointer',
                                offset: new AMap.Pixel(-15, -15),
                                zIndex: -1,
                                style: {
                                    'width': '0px',
                                    'height': '0px',
                                    'border-radius': '50%',
                                    'border-width': 0,
                                    'text-align': 'center',
                                    'font-size': '16px',
                                    'color': 'red',
                                    'background-color': "red",
                                    'animation': 'myfirst01 1s infinite',
                                },
                                position: array[i].LngLat,
                            })
                            result.push({
                                keys:array[i].name,
                                value:text
                            })
                        }
                    return result;
            }

         
            return {


            }
        }
    });
</script>
<style lang="less">
    @keyframes myfirst01 {
        0% {
            -moz-box-shadow: 0px 0px 10px 10px aqua;
            box-shadow: 0px 0px 10px 10px aqua;
        }

        25% {
            -moz-box-shadow: 0px 0px 10px 15px aqua;
            box-shadow: 0px 0px 20px 15px aqua;
        }

        50% {
            -moz-box-shadow: 0px 0px 20px 20px aqua;
            box-shadow: 0px 0px 30px 20px aqua;
        }

        75% {
            -moz-box-shadow: 0px 0px 20px 15px aqua;
            box-shadow: 0px 0px 20px 15px aqua;
        }

        100% {
            -moz-box-shadow: 0px 0px 10px 10px aqua;
            box-shadow: 0px 0px 10px 10px aqua;
        }

    }
</style>