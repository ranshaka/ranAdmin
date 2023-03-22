
<template>
     <div class="homeInfo">
        00.0.
        <div id="mapApp2" class="mapApp" style="width:100%;height:100%;">
        </div>
        <div class="homeInfoCar">
            <div >
                <div style="display:flex;align-items: center;">
                    <a-button size="Default" type="warning" @click="startAnimation">重新播放</a-button>
                    <!-- <a-slider v-model="sliderValue" 
                 
                    @change="ChangeAnimation" 
                     @input="inputAnimation"
                     :show-tooltip="true"
                     :format-tooltip="formatTooltip"
                      style="width:400px;margin:20px;"   /> -->
                      <div  style="width:500px;height:15px;margin:0 20px;" >
                        <a-slider v-model:value="sliderValue" :tooltip-visible="true"  @change="ChangeAnimation" @afterChange="afterChangeAnimation" style="width:500px;height:15px;margin:0 20px;"  />
                      </div>
                     
                    <!-- <a-slider v-model:value="sliderValue" @input="ChangeAnimation"  style="width:500px;height:15px;margin:0 20px;" /> -->

                    <div style="display:flex" >
                        <!-- <fast-backward-outlined  @click="linebackspeedMIN" title="暂停行驶" />
                        <fast-forward-outlined  @click="linebackspeedMAX" title="加速行驶" />
                        <play-circle-outlined @click="resumeAnimation"  title="继续行驶" />
                        <stop-outlined  @click="resumeAnimation"  title="暂停行驶" /> -->

                        <!-- <a-tag size="Default" @click="linebackspeedMIN">减速行驶</a-tag>
                        <a-tag size="Default" @click="pauseAnimation">暂停行驶</a-tag>
                        <a-tag size="Default" @click="resumeAnimation">继续行驶</a-tag>
                        <a-tag size="Default" @click="linebackspeedMAX">加速行驶</a-tag> -->
                            <FastBackwardOutlined style="color:#12a3f5;font-size:28px;" title="减速行驶"
                                @click="linebackspeedMIN" />
                            <PauseOutlined style="color:#12a3f5;font-size:28px;" title="暂停行驶" @click="pauseAnimation"  v-if="PauseOutlinedFlag" />
                            <CaretRightOutlined style="color:#12a3f5;font-size:28px;" title="继续行驶"
                                @click="resumeAnimation" v-else />
                            <FastForwardOutlined style="color:#12a3f5;font-size:28px;" title="加速行驶"
                                @click="linebackspeedMAX" />
                               
                        </div>
                    </div>
             
            </div>

            <a-table size="small" :columns="columns" :data-source="tableData[tableDataIndex]"  border style="width: 100%" 
             :rowClassName="setRowClass"  :scroll="{ x: 1500,}"  :pagination="false"
             id="Export">
        </a-table>
        <div class="flex space-between ">
            <div></div>
            <a-pagination v-model:current="tableDataIndex" :total="tableDataTotal" :page-size="5" />
        </div>
      
        </div>
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
        PauseOutlined,
        CaretRightOutlined,
        FastForwardOutlined,
        FastBackwardOutlined,
      
    } from '@ant-design/icons-vue';
    import {
        useStore
    } from "vuex";
    import {markerList} from "@/view/map/map.js"
    export default defineComponent({
        name: 'BusinessManagement',
        components:{
            PauseOutlined,
        CaretRightOutlined,
        FastForwardOutlined,
        FastBackwardOutlined,
        },
        setup() {
            const store = useStore()
            const modelRef = ref(null)
            store.dispatch("map/AmapInit").then((amap) => {
                amap.init("mapApp2", {
                    // mapStyle: 'amap://styles/darkblue', //设置地图的显示样式
                    rotateEnable: false,
                    pitchEnable: true,
                    resizeEnable: true,
                    zoom: 10,
                    // pitch: 45, //45度俯视
                    viewMode: '3D', //type ? '2D' : '3D', //开启3D视图,默认为关闭
                    zooms: [2, 20],
                    skyColor: "#002d56", //天空颜色 倾斜后才会产生
                    center: [120.294189,30.161941],
                })
            })
            const map=computed(()=>store.state.map.Amap)
            const sliderRef=ref(null)
            const tableData=ref([])
            const tableDataTotal=ref(0)
            const tableDataIndex=ref(1)
            const tableDataSize=ref(5)
            const moveAlongIndex = ref(1)  // 行驶下标
            const sliderValue = ref(0)         // 行驶下标
            const PauseOutlinedFlag  = ref(false)    // 暂停
            const barSearchFlag   = ref(false)    // 行驶下标
            const totalmileage   = ref(0)     // 行驶总公里数
            const linebackspeed = ref(1000) // 行驶速度
            const totalDateTime = ref(0) // 行驶耗时
            const columns=[
                {
                title: 'name',
                dataIndex: 'name',
                },
                {
                title: 'style',
                dataIndex: 'style',
                width:120,
                },
                {
                title: '经纬度',
                dataIndex: 'lnglat',
                width:200,
                },
                {
                title: '地址',
                dataIndex: 'address',
                },
            ]
            var marker = null // 车辆markser
            var PolylinesArr = [] // 轨迹列表
            var gjlineArr = [] // 储存轨迹线段list
            var gjspotArr = [] // 储存轨迹点list
            var delayedpolylinTime = null // 车辆行驶 计时器

            setTimeout(()=>{
                SpoUppolyline()
            },500)
            const formatAngle = (dv) => {
                while (dv < 0) dv += 360;
                while (dv >= 360) dv -= 360;
                if (dv == 0) return "正北";
                else if (dv == 90) return "正东";
                else if (dv == 180) return "正南";
                else if (dv == 270) return "正西";
                var dx = Math.floor(dv / 45);
                switch (dx) {
                    case 0:
                        return "北偏东" + dv + "°";
                    case 1:
                        return "东偏北" + (90 - dv) + "°";
                    case 2:
                        return "东偏南" + (dv - 90) + "°";
                    case 3:
                        return "南偏东" + (180 - dv) + "°";
                    case 4:
                        return "南偏西" + (dv - 180) + "°";
                    case 5:
                        return "西偏南" + (270 - dv) + "°";
                    case 6:
                        return "西偏北" + (dv - 270) + "°";
                    case 7:
                        return "北偏西" + (360 - dv) + "°";
                    default:
                        return dv;
                }
            }

            const handleTableChange = (info) => {
                current.value = info
            }
            const SetUpbarPromoteFlag = () => {
                barPromoteFlag.value = true
            }
            // 计算公里数
            const  getDistanceTwoPointn =(point1, point2)=> {
                
                return Math.sqrt(Math.pow(point2.mx - point1.mx, 2) + Math.pow(point2.my - point1.my, 2))
            }
            const  arraySlice=(array, sliceNum)=> {
                let newArray=[]
                let viod = 0;//数组初始量
                for (let i = 0; i <= array.length; i++) {
                if (i % sliceNum == 0 && i != 0) {
                    newArray.push(array.slice(viod, i));
                    viod = i;
                }
                if (i + 1 == array.length) {
                    newArray.push(array.slice(viod, i + 1));
                }
                }
                return newArray;
            }
      
            const SpoUppolyline = async() => {
                    closePolyline(false)
                    sliderValue.value = 0
                    if (marker) {
                        map.value.amap.remove(marker)
                        marker = null
                    }
                        PauseOutlinedFlag.value = true
                        
                        let info = markerList
                        console.log(info)
                        barSearchFlag.value = true
                        tableDataTotal.value=info.length
                          tableData.value = [
                            [], ...arraySlice(info, 5)
                        ]
                        PolylinesArr = info.map((x) => {
                            return {
                                value: x.lnglat,
                                color: x.color,
                                address:x.address
                            }
                        })

                        map.value.amap.setZoomAndCenter(14, PolylinesArr[0].value)
                 
                        SetUppolyline()
                    
                

            }


           





            const stringToTimeStamp = (date) => {
                date = date.substring(0, 19);
                date = date.replace(/-/g, '/');
                return new Date(date).getTime() / 1000;
            }

            

            //  开始车辆轨迹
            const SetUppolyline = () => {
                if (marker) {
                    map.value.amap.remove(marker)
                }
                marker = new AMap.Marker({
                    position: PolylinesArr[0].value,
                    icon: "https://webapi.amap.com/images/car.png",
                    offset: new AMap.Pixel(-13, -13),
                    autoRotation: true,
                    angle: -90,
                    zIndex: 200
                });
                map.value.amap.setZoomAndCenter(16, PolylinesArr[0].value)
         
                marker.on("moving", e => {
                    let movingLine = new AMap.Polyline({
                        map: map.value.amap,
                        strokeWeight: 5,
                        lineJoin: "round",
                        strokeColor: PolylinesArr[moveAlongIndex.value].color,
                        // strokeColor: "#f60",
                        zIndex: 110,
                        path:e.passedPath
                    })
                    gjspotArr.push({
                        keys: moveAlongIndex.value,
                        value: movingLine,
                    })
                })
                marker.on("moveend", e => {
                    moveAlongIndex.value++
                    delayedpolylin()
                 
                    
                })
                map.value.amap.add(marker)
                moveAlongIndex.value = 1
                delayedpolylin()
            }

          
            // 车辆行驶
            const delayedpolylin = () => {
              
                if (delayedpolylinTime) {
                    clearTimeout(delayedpolylinTime)
                }
                if(moveAlongIndex.value == PolylinesArr.length-1 )return
                if (!PauseOutlinedFlag.value) return;
                
                
                // return
                // if (JSON.stringify(PolylinesArr[moveAlongIndex.value - 1].value+"") == JSON.stringify(PolylinesArr[moveAlongIndex.value].value+"")) {
                if (PolylinesArr[moveAlongIndex.value - 1].value[0] == PolylinesArr[moveAlongIndex.value].value[0]) {
                    
                    delayedpolylinTime = setTimeout(() => {
                        let movingLine = new AMap.Polyline({
                            map: map.value.amap,
                            strokeWeight: 5,
                            lineJoin: "round",
                            strokeColor: PolylinesArr[moveAlongIndex.value].color,
                            zIndex: 110
                        })
                      
                        movingLine.setPath([PolylinesArr[moveAlongIndex.value - 1].value,
                            PolylinesArr[moveAlongIndex.value].value
                        ])
                        gjspotArr.push({
                            keys: moveAlongIndex.value,
                            value: movingLine,
                        })
                       
                        let tempPoint = new AMap.Marker({
                            map: map.value.amap,
                            position: PolylinesArr[moveAlongIndex.value].value,
                            offset: new AMap.Pixel(-5, -5),
                            icon: new AMap.Icon({
                                image: 'https://a.amap.com/jsapi_demos/static/images/mass2.png', // Icon的图像
                                size: new AMap.Size(10, 10),
                                imageSize: new AMap.Size(10, 10),
                            }),
                            zIndex: 113
                        })
                        gjlineArr.push({
                            keys: moveAlongIndex.value,
                            value: tempPoint,
                        })
                        moveAlongIndex.value++
                     
                        delayedpolylin()
                    }, 300)
                } else {
                    startmoveAlong(1)
                }
            }

            // 车辆行驶 添加轨迹和 轨迹点
            const startmoveAlong = () => {
                
                if (!PauseOutlinedFlag.value) return;
                let tempPoint = new AMap.Marker({
                    map: map.value.amap,
                    position: PolylinesArr[moveAlongIndex.value-1].value,
                    offset: new AMap.Pixel(-4, -4),
                    icon: new AMap.Icon({
                        image: 'https://a.amap.com/jsapi_demos/static/images/mass2.png', // Icon的图像
                        size: new AMap.Size(8, 8),
                        imageSize: new AMap.Size(8, 8),
                    }),
                    zIndex: 113
                })
                tempPoint.setTitle(PolylinesArr[moveAlongIndex.value].address)
               
                gjlineArr.push({
                    keys: moveAlongIndex.value,
                    value: tempPoint,
                })
                
                marker.moveTo(PolylinesArr[moveAlongIndex.value].value, linebackspeed.value, function (k) {
                    return k
                });
                
            }

            // 关闭车辆轨迹
            const closePolyline = (type) => {
                if (type) {
                    PauseOutlinedFlag.value = false
                    let car = map.value.getMarker('car')
                    map.value.amap.add(car.map((x) => {
                        return x.value
                    }))
            
                    emitter.emit("CheckcomponentName", 'monitor')
                }

                if (marker) {
                    map.value.amap.remove(marker)
                    marker = null
                }
                if (PolylinesArr) {
                    marker = []
                }

                if (gjlineArr.length) {
                    map.value.amap.remove(gjlineArr.map((x) => x.value))
                    gjlineArr = []
                }
                if (gjspotArr.length) {
                    map.value.amap.remove(gjspotArr.map((x) => x.value))
                    gjspotArr = []
                }

                moveAlongIndex.value = 1
                sliderValue.value = 0

            }

            var inputAnimationNumber=0
           
            const inputAnimation = (e) => {
                inputAnimationNumber=e
                pauseAnimation()
            }
            const formatTooltip = (e) => {
                if(PolylinesArr.length){
                    return PolylinesArr[moveAlongIndex.value-1].address+" (路程行驶 "+sliderValue.value+"%)"
                }else{
                    return "准备出发"
                }
               
            }

            const ChangeAnimation = (e) => {
                pauseAnimation()
            }
            
            const afterChangeAnimation = (e) => {
                 let Amap = map.value.amap
                let num=parseInt(PolylinesArr.length * (e/100))
                if(moveAlongIndex.value == num){
                }else if(moveAlongIndex.value > num){
                    let line= gjlineArr.filter((x)=>{return x.keys > num}).map(x=>x.value)
                    let spot= gjspotArr.filter((x)=>{return x.keys > num}).map(x=>x.value)
                    gjlineArr=gjlineArr.filter((x)=>{return x.keys > num})
                    gjspotArr=gjspotArr.filter((x)=>{return x.keys > num})
                    Amap.remove(line)
                    Amap.remove(spot)
                }else{
                    for(let i=moveAlongIndex.value;i<num;i++){
                        let movingLine = new AMap.Polyline({
                        path:[PolylinesArr[i-1].value,PolylinesArr[i].value],
                        map: Amap,
                        strokeWeight: 5,
                        lineJoin: "round",
                        strokeColor:  PolylinesArr[i].color,
                        zIndex: 110
                    })
                    // movingLine.setPath([PolylinesArr[i-1].value,PolylinesArr[i]].value)
                    gjspotArr.push({
                        keys: i,
                        value: movingLine,
                    })
                     let tempPoint = new AMap.Marker({
                        map: Amap,
                        position: PolylinesArr[i].value,
                        offset: new AMap.Pixel(-4, -4),
                        icon: new AMap.Icon({
                            image: 'https://a.amap.com/jsapi_demos/static/images/mass2.png', // Icon的图像
                            size: new AMap.Size(8, 8),
                            imageSize: new AMap.Size(8, 8),
                        }),
                        zIndex: 113
                    })
                    gjlineArr.push({
                        keys: i,
                        value: tempPoint,
                    })
                    }

                }
                moveAlongIndex.value=num+1
                marker.setPosition(PolylinesArr[num].value )
                   PauseOutlinedFlag.value = true
                  delayedpolylin()
            }
            // 重新播放
            const startAnimation = () => {
                if (PolylinesArr.length) {
                    marker.pauseMove();
                    PauseOutlinedFlag.value = false
                    closePolyline(false)
                    if (delayedpolylinTime) {
                        clearTimeout(delayedpolylinTime)
                    }
                    setTimeout(() => {
                        PauseOutlinedFlag.value = true
                        SetUppolyline(1)
                    }, 400)

                } else {
                    message.error("暂无行驶轨迹！")
                }
            }
            // 暂停
            const pauseAnimation = () => {
                marker.pauseMove();
                PauseOutlinedFlag.value = false
            }
            // 继续播放
            const resumeAnimation = () => {
                if (delayedpolylinTime) {
                    clearTimeout(delayedpolylinTime)
                }
                setTimeout(() => {
                    PauseOutlinedFlag.value = true
                    delayedpolylin()
                }, 400)
            }
            // 加速
            const linebackspeedMAX = () => {
                if (linebackspeed.value >= 10000) return
                linebackspeed.value += 500
            }
            // 减速
            const linebackspeedMIN = () => {
                if (linebackspeed.value <= 1000) return
                linebackspeed.value -= 500
            }
            // 监听表格动画 设置分页
            watch(moveAlongIndex, (e) => {
                tableDataIndex.value= ((e+1) / 5 <= 1) ? 1 : Math.ceil((e+1) / 5)
                if(e==  PolylinesArr.length -1 )return  sliderValue.value  =100
               let number= (e / (PolylinesArr.length+1) * 100)
                sliderValue.value = parseInt(number)
            })
            // 监听表格动画 表格样式

            const setRowClass = (record, index) => {
                if ((tableDataIndex.value-1) * 5 + index == moveAlongIndex.value) {
                    return "tableActive"
                } else {
                    return ""
                }
            }
            const currentChange = (e) => {
                tableDataIndex.value=e
                
            }





            return {
                // 参数
                tableData,
                columns,
                tableDataTotal,
                tableDataIndex,
                tableDataSize,
                sliderRef,
                sliderValue,
                totalmileage,
                PauseOutlinedFlag,
                ChangeAnimation,
                inputAnimation,
                afterChangeAnimation,
                formatTooltip,
                currentChange,









                // 方法
                handleTableChange,
                SpoUppolyline,
                SetUpbarPromoteFlag,
                startAnimation,
                pauseAnimation,
                resumeAnimation,
                linebackspeedMAX,
                linebackspeedMIN,
              
                closePolyline,
                setRowClass,
              
              
            }
        }
    });
</script>
<style lang="less">
    .homeInfo {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
        background: #00000C;

        .mapApp {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .homeInfoCar{
            position: absolute;
            bottom:0;
            left:10px;
            right:10px;
            height:350px;
            background:#FFF;
            padding: 20px;
            box-sizing: border-box;
        }
        .tableActive{
            color:aqua;
        }
    }


    // 高度地图
</style>