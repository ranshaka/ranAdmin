<template>
    <div class="mapmarker">
        123123111111
    </div>
</template>

<script>
    import {
        computed,
        defineComponent,
        nextTick,
        reactive, //响应式
        ref,
        onMounted,
    } from 'vue';
    import {
        useStore
    } from "vuex";
    import {
        fetchPost
    } from '@/utils/requestMap'



    import {
        WGS842GCJ022,
        wgs84togcj02,
        lonlatTomercator,
        mercatorTolonlat,
    } from "@/utils/mapInit.js"
    

    export default defineComponent({
        name: 'BusinessManagement2',
         setup() {
            const store = useStore()
            const map=computed(()=>store.getters.AmapInfo)
            const carData=ref([])
            var styleList = {
                1: new AMap.Icon({
                    image: require("../../../../images/map/c1.png"),
                    size: new AMap.Size(22, 22), //图标大小
                    imageSize: new AMap.Size(22, 22)
                }),
                2: new AMap.Icon({
                    image: require("../../../../images/map/w2.png"),
                    size: new AMap.Size(22, 22), //图标大小
                    imageSize: new AMap.Size(22, 22)
                }),
                3: new AMap.Icon({
                    image: require("../../../../images/map/w6.png"),
                    size: new AMap.Size(22, 22), //图标大小
                    imageSize: new AMap.Size(22, 22)
                }),
                4: new AMap.Icon({
                    image: require("../../../../images/map/c4.png"),
                    size: new AMap.Size(22, 22), //图标大小
                    imageSize: new AMap.Size(22, 22)
                }),
                5: new AMap.Icon({
                    image: require("../../../../images/map/c2.png"),
                    size: new AMap.Size(22, 22), //图标大小
                    imageSize: new AMap.Size(22, 22)
                }),
                6: new AMap.Icon({
                    image: require("../../../../images/map/c6.png"),
                    size: new AMap.Size(22, 22), //图标大小
                    imageSize: new AMap.Size(22, 22)
                }),
            }
            const peiIcon = new AMap.Icon({
                image: require("../../../../images/map/w6.png"),
                size: new AMap.Size(30, 30), //图标大小
                imageSize: new AMap.Size(30, 30)
            })
            const init = (type, numberPlates) => {
                let Amap = store.getters.AmapInfo.getAmap()
                console.log(map.value.amap)
                console.log(Amap)
                if (cleckMarkerFlash) {
                    Amap.remove(cleckMarkerFlash)
                }
                if (faultMarkerFlash.length) {
                    console.log(faultMarkerFlash)
                    Amap.remove(faultMarkerFlash.map(x=>x.value))
                }
                if (giveAnAlarmMarkerFlash.length) {
                    Amap.remove(giveAnAlarmMarkerFlash.map(x=>x.value))
                }
                car_scatterer({
                    numberPlates: numberPlates,
                    type: type
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
                        carData.value=array
                        if(map.value.getMarker('carlist') && map.value.getMarker('carlist').length){
                            switchMarker(array,type)
                        }else{
                            addMarker(array)
                        }
                        
                    }
                })
            }


            // 添加撒点
            const addMarker = (list) => {
                let carlist = map.value.getMarker('carlist')
                if (carlist && carlist.length) {
                    map.value.amap.remove(carlist.map(x => x.value))
                }
                let result = []
                for (let i = 0; i < list.length; i++) {
                    if (list[i].LngLat) {
                        let marker = new AMap.Marker({
                            position: new AMap.LngLat(list[i].LngLat[0], list[i].LngLat[1]),
                            icon: styleList[list[i].style],
                            offset: new AMap.Pixel(-30, -30),
                            extData: list[i],
                        });
                        result.push({
                            value: marker,
                            keys: list[i].RPlateNumber
                        })
                        marker.on('click', function (e) {
                            clickMarker(list[i], e)
                            emitter.emit("carDatails", e)
                        })
                    }
                }
                map.value.setMarker("carlist", result)
                map.value.amap.add(result.map(x => x.value))
                number_large_screen_vehicles_Fun()
            }

            // 切换撒点
            const switchMarker=(list,type)=>{
                let carlist = map.value.getMarker('carlist')
                if(allMarkerFlash && allMarkerFlash.length){
                        map.value.amap.remove(allMarkerFlash.map(x=>x.value))
                        cleckMarkerFlash=[]
                    }
                if (!carlist && !carlist.length)return;
                for(let i=0;i<carlist.length;i++){
                    if(list.some(x=>x.RPlateNumber == carlist[i].keys)){
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
                    if (carlist[i].keys == info.RPlateNumber) {
                        //自定义覆盖物
                        if (cleckMarkerFlash) {
                            map.value.amap.remove(cleckMarkerFlash)
                        }
                        cleckMarkerFlash = addMarkerFlash([{RPlateNumber:info.RPlateNumber,LngLat:info.LngLat,}])[0].value
                        console.log(cleckMarkerFlash)
                        carlist[i].value.setIcon(peiIcon)
                    } else {
                        carlist[i].value.setIcon(styleList['4'])
                    }
                }
            }

            // 添加选中
            var allMarkerFlash = []
            var allMarkerFlashQuery=""
            const OPERATION = (query) => {
                if(allMarkerFlash.length && allMarkerFlashQuery &&  allMarkerFlashQuery== JSON.stringify(query)){
                    map.value.amap.remove(allMarkerFlash.map(x=>x.value))
                    allMarkerFlash=[]
                    return
                }
                allMarkerFlashQuery=JSON.stringify(query)
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
            const addMarkerFlash=(array,animation)=>{
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
                                    'animation': (animation?animation:'myfirst01')+ ' 1s infinite',
                                },
                                position: array[i].LngLat,
                            })
                            result.push({
                                keys:array[i].RPlateNumber,
                                value:text
                            })
                        }
                    return result;
            }

            var  faultMarkerFlash=[]
            var  giveAnAlarmMarkerFlash=[]
            const number_large_screen_vehicles_Fun=()=>{
                number_large_screen_vehicles().then((res)=>{
                if(res.code==200){
                    let car=res.data
                    let fault=carData.value.filter(x=> car.faultNumberPlate.includes(x.RPlateNumber)  )
                    let giveAnAlarm=carData.value.filter(x=> car.giveAnAlarmNumberPlate.includes(x.RPlateNumber)  )
                    faultMarkerFlash=addMarkerFlash(fault,'myfirst02')
                    giveAnAlarmMarkerFlash=addMarkerFlash(giveAnAlarm,'myfirst03')
                }
            })
            }

            onMounted(() => {
                emitter.on("OPERATION", (query) => {
                    OPERATION(query)
                })
            })

            return {
                init,
                OPERATION,
                addMarker,
                clickMarker,
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
    // red
 @keyframes myfirst02 {
        0% {
            -moz-box-shadow: 0px 0px 10px 10px red;
            box-shadow: 0px 0px 10px 10px red;
        }

        25% {
            -moz-box-shadow: 0px 0px 10px 15px red;
            box-shadow: 0px 0px 20px 15px red;
        }

        50% {
            -moz-box-shadow: 0px 0px 20px 20px red;
            box-shadow: 0px 0px 30px 20px red;
        }

        75% {
            -moz-box-shadow: 0px 0px 20px 15px red;
            box-shadow: 0px 0px 20px 15px red;
        }

        100% {
            -moz-box-shadow: 0px 0px 10px 10px red;
            box-shadow: 0px 0px 10px 10px red;
        }

    }

    @keyframes myfirst03{
        0% {
            -moz-box-shadow: 0px 0px 10px 10px yellow;
            box-shadow: 0px 0px 10px 10px yellow;
        }

        25% {
            -moz-box-shadow: 0px 0px 10px 15px yellow;
            box-shadow: 0px 0px 20px 15px yellow;
        }

        50% {
            -moz-box-shadow: 0px 0px 20px 20px yellow;
            box-shadow: 0px 0px 30px 20px yellow;
        }

        75% {
            -moz-box-shadow: 0px 0px 20px 15px yellow;
            box-shadow: 0px 0px 20px 15px yellow;
        }

        100% {
            -moz-box-shadow: 0px 0px 10px 10px yellow;
            box-shadow: 0px 0px 10px 10px yellow;
        }

    }
  
</style>