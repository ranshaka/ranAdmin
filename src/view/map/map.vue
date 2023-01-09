<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->

<template>
    <div class="mapInfo" id="mapInfo">
        <div id="mapApp" class="mapApp" style="width:100%;height:100%;">
        </div>
        <markerInit></markerInit>
        <mapleft></mapleft>
        <mapright></mapright>
    </div>
</template>

<script>
    import {
        computed,
        defineComponent,
        ref,
    } from 'vue';
    import {
        useStore
    } from "vuex";
    import markerInit from "@/view/map/marker.vue"
    import mapleft from "@/view/map/homeInfoExt/mapleft.vue"
    import mapright from "@/view/map/homeInfoExt/mapright.vue"
    // import model from "@/view/map/model/model.vue"
    export default defineComponent({
        name: 'BusinessManagement',
        components: {
            markerInit,
            mapleft,
            mapright,
          
        },
        setup() {
            const store = useStore()
            store.dispatch("map/AmapInit").then((amap) => {
                amap.init("mapApp", {
                    mapStyle: 'amap://styles/darkblue', //设置地图的显示样式
                    rotateEnable: false,
                    pitchEnable: true,
                    resizeEnable: true,
                    zoom: 10,
                    // pitch: 45, //45度俯视
                    // rotation: 45,
                    viewMode: '3D', //type ? '2D' : '3D', //开启3D视图,默认为关闭
                    zooms: [2, 20],
                    skyColor: "#002d56", //天空颜色 倾斜后才会产生
                    center: [120.300189, 30.25941],
                    // resizeEnable: true,
                    // zoom: 12
                })


            })

            return {


            }
        }
    });
</script>
<style lang="less">
    .mapInfo {
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



    }


    // 高度地图
</style>
<style lang="less">
    
.svnTitle{
    display: block;
    padding-left:20px;
    color:#EAEDF9;
    /* text-shadow: 0 0 10px #0F5ACC,0 0 20px #0F5ACC,0 0 30px #0F5ACC,0 0 40px #0F5ACC; */
    font-size: 20px;
    height:40px;
    line-height: 40px;
    position: relative;
    text-shadow:-1px 0 #0780D8,
    0 1px #0780D8,
    1px 0 #0780D8,
    0 -1px #0780D8;
}
.svnTitle::before{
    content: "";
    display: block;
    position: absolute;
    width:10px;
    height:10px;
    border-radius: 50%;
    left:0;
    top:50%;
    margin-top:-5px;
    background:#FFf;
    /* margin-right:20px; */
}

.modelTitle{
    background: url("./images/view/1j.png");
    background-size: 100% 100%;
    width:300px;
    color:#FFf;
    height:44px;
    font-size:22px;
    padding-left:10px;
    font-weight: 600;
    word-spacing:20px;
    text-shadow: 2px 2px 20px #2C53AE;
    position: relative;
    margin-bottom:6px;
}

.sign {
            color: aqua;
            width: 2rem;
            height: 12px;
            transform: skewX(35deg);
            background: #373E54;
            line-height: 20px;
            position: relative;
            margin-right: 20px;

            .signBg {
                position: absolute;
                bottom: 0;
                right: 0;
                top: 0;
                left: 0;
                background: linear-gradient(to right,
                        #2d83fa,
                        #10faf8);
            }

            &:before {
                content: "|||";
                display: inline-block;
                font-weight: 900;
                color: #FFF;
                line-height: 20px;
                position: absolute;
                position: absolute;
                top: -5px;
                left: -17px;
                color: #2d83fa;
            }
        }




        .sign-orange{
  .signBg{
    background: linear-gradient(
      to right,
      #4BF15A,
      #C6D039
  );
  }
  &:before{
    color:#4BF15A;
  }
}
.sign-purple{
  .signBg{
    background: linear-gradient(
      to right,
      #6B56F4,
      #3286FF ;
  );
  }
  &:before{
    color:#3286FF;
  }
}
.sign-red{
  .signBg{
    background: linear-gradient(
      to right,
      #A13335,
      #f60 ;
  );
  }
  &:before{
    color:#A13335;
  }
}
.sign-aqua{
  .signBg{
    background: linear-gradient(
      to right,
      #37FFB8,
      rgb(14, 135, 248) ;
  );
  }
  &:before{
    color:#37FFB8;
  }
}
.sign-pink{
  .signBg{
    background: linear-gradient(
      to right,
      #ec008c,
      #6739b6;
  );
  }
  &:before{
    color:#ec008c;
  }
}
</style>