(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ab4c7"],{"154a":function(e,t,a){"use strict";a.r(t);var o=a("f2bf");const i={style:{height:"300px"}};function n(e,t,a,n,s,l){const r=Object(o["W"])("echarts"),c=Object(o["W"])("a-col"),p=Object(o["W"])("a-row");return Object(o["N"])(),Object(o["m"])("div",null,[Object(o["n"])("div",i,[Object(o["q"])(p,{class:"height100"},{default:Object(o["ib"])(()=>[Object(o["q"])(c,{span:12},{default:Object(o["ib"])(()=>[Object(o["q"])(r,{options:e.option,class:"width100 height100"},null,8,["options"])]),_:1}),Object(o["q"])(c,{span:12},{default:Object(o["ib"])(()=>[Object(o["q"])(r,{options:e.option2,class:"width100 height100"},null,8,["options"])]),_:1})]),_:1})]),Object(o["q"])(r,{options:e.option3,class:"width100",style:{height:"300px"}},null,8,["options"])])}var s=a("bd29"),l=Object(o["r"])({components:{echarts:s["a"]},setup(){const e={color:["#e54d42","#0081ff"],grid:{top:"3%",left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{axisLine:{lineStyle:{color:"#777",width:1}},splitLine:{show:!1,lineStyle:{color:"#222"}},data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}],yAxis:[{type:"value",axisLine:{lineStyle:{color:"#777",width:1}},splitLine:{show:!0,lineStyle:{color:"rgba(255,255,255,0.1)"}}}],series:[{name:"Line 1",type:"line",smooth:!0,areaStyle:{color:{type:"linear",x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:"rgba(120, 255, 255, 0.8)"},{offset:.6,color:"rgba(120, 255, 255,0)"}],global:!1}},data:[140,232,101,100,90,340,250]},{name:"Line 2",type:"line",smooth:!0,areaStyle:{color:{type:"linear",x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:"rgba(1, 255, 255, 0.8)"},{offset:.6,color:"rgba(1, 255, 255,0)"}],global:!1}},data:[120,282,111,234,220,340,310]}]},t={title:{text:"Temperature Change in the Coming Week"},tooltip:{trigger:"axis"},legend:{},toolbox:{show:!0,feature:{dataZoom:{yAxisIndex:"none"},dataView:{readOnly:!1},magicType:{type:["line","bar"]},restore:{},saveAsImage:{}}},xAxis:{type:"category",boundaryGap:!1,data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},yAxis:{type:"value",axisLabel:{formatter:"{value} °C"}},series:[{name:"Highest",type:"line",data:[10,11,13,11,12,12,9],markPoint:{data:[{type:"max",name:"Max"},{type:"min",name:"Min"}]},markLine:{data:[{type:"average",name:"Avg"}]}},{name:"Lowest",type:"line",data:[1,-2,2,5,3,2,0],markPoint:{data:[{name:"周最低",value:-2,xAxis:1,yAxis:-1.5}]},markLine:{data:[{type:"average",name:"Avg"},[{symbol:"none",x:"90%",yAxis:"max"},{symbol:"circle",label:{position:"start",formatter:"Max"},type:"max",name:"最高点"}]]}}]},a={xAxis:{type:"category",boundaryGap:!1},yAxis:{type:"value",boundaryGap:[0,"30%"]},visualMap:{type:"piecewise",show:!1,dimension:0,seriesIndex:0,pieces:[{gt:1,lt:3,color:"rgba(0, 0, 180, 0.4)"},{gt:5,lt:7,color:"rgba(0, 0, 180, 0.4)"}]},series:[{type:"line",smooth:.6,symbol:"none",lineStyle:{color:"#5470C6",width:5},markLine:{symbol:["none","none"],label:{show:!1},data:[{xAxis:1},{xAxis:3},{xAxis:5},{xAxis:7}]},areaStyle:{},data:[["2019-10-10",200],["2019-10-11",560],["2019-10-12",750],["2019-10-13",580],["2019-10-14",250],["2019-10-15",300],["2019-10-16",450],["2019-10-17",300],["2019-10-18",100]]}]};return{option:e,option2:t,option3:a}}}),r=a("6b0d"),c=a.n(r);const p=c()(l,[["render",n]]);t["default"]=p}}]);