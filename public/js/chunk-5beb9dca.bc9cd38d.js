(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5beb9dca"],{"2ee9":function(t,e,s){},4902:function(t,e,s){"use strict";s.r(e);var i=s("f2bf");const c={class:"content minHeight100"},l={class:"lottery-box"},n={class:"lottery"},o={class:"lottery-item"},r={class:"lottery-start"},a={key:0,class:"box gray"},h=Object(i["n"])("p",null,"活动未开始",-1),b=[h],j=Object(i["n"])("p",null,[Object(i["n"])("b",null,"抽奖")],-1),p={key:2,class:"box gray"},m=Object(i["n"])("p",null,"活动已过期",-1),d=[m],O={class:"box"},g=["src"],u=Object(i["n"])("p",null,[Object(i["n"])("img",{style:{width:"100%"},src:"https://joe.foshanlepin.com/lottery_draw/src/assets/img/j2.png",alt:""})],-1),y=Object(i["n"])("div",null,"获奖结果",-1),w={style:{"text-align":"center"}};function f(t,e,s,h,m,f){const v=Object(i["W"])("a-modal");return Object(i["N"])(),Object(i["m"])("div",c,[Object(i["n"])("div",l,[Object(i["n"])("div",n,[Object(i["n"])("div",o,[Object(i["n"])("div",r,[0===m.isStart?(Object(i["N"])(),Object(i["m"])("div",a,b)):Object(i["l"])("",!0),1===m.isStart?(Object(i["N"])(),Object(i["m"])("div",{key:1,class:"box",onClick:e[0]||(e[0]=(...t)=>f.startLottery&&f.startLottery(...t))},[j,Object(i["n"])("p",null,"消耗"+Object(i["Z"])(m.score)+"积分",1)])):Object(i["l"])("",!0),2===m.isStart?(Object(i["N"])(),Object(i["m"])("div",p,d)):Object(i["l"])("",!0)]),Object(i["n"])("ul",null,[(Object(i["N"])(!0),Object(i["m"])(i["b"],null,Object(i["U"])(m.list,(t,e)=>(Object(i["N"])(),Object(i["m"])("li",{class:Object(i["B"])(e==m.index?"on":""),key:e},[Object(i["n"])("div",O,[Object(i["n"])("p",null,[Object(i["n"])("img",{src:t.img,alt:""},null,8,g)]),Object(i["n"])("p",null,Object(i["Z"])(t.title),1)])],2))),128))])])]),Object(i["q"])(v,{visible:m.showToast,"onUpdate:visible":e[1]||(e[1]=t=>m.showToast=t),width:"30%",onOk:e[2]||(e[2]=t=>m.showToast=!1)},{title:Object(i["ib"])(()=>[y]),default:Object(i["ib"])(()=>[u,Object(i["n"])("h2",w,"获得 "+Object(i["Z"])(m.list[m.index].title),1)]),_:1},8,["visible"])])])}var v={data(){return{isStart:1,score:10,list:[{img:"https://joe.foshanlepin.com/lottery_draw/src/assets/img/j1.png",title:"谢谢参与"},{img:"https://joe.foshanlepin.com/lottery_draw/src/assets/img/j2.png",title:"美女一个"},{img:"https://joe.foshanlepin.com/lottery_draw/src/assets/img/j1.png",title:"宝马一辆"},{img:"https://joe.foshanlepin.com/lottery_draw/src/assets/img/j2.png",title:"单车一辆"},{img:"https://joe.foshanlepin.com/lottery_draw/src/assets/img/j1.png",title:"鸡蛋一蓝"},{img:"https://joe.foshanlepin.com/lottery_draw/src/assets/img/j2.png",title:"500红包"},{img:"https://joe.foshanlepin.com/lottery_draw/src/assets/img/j1.png",title:"靓号一个"},{img:"https://joe.foshanlepin.com/lottery_draw/src/assets/img/j2.png",title:"鲜花一蓝"}],index:0,count:8,timer:0,speed:200,times:0,cycle:50,prize:-1,click:!0,showToast:!1}},mounted(){},methods:{startLottery(){this.click&&this.startRoll()},startRoll(){if(this.times+=1,this.oneRoll(),this.times>this.cycle+10&&this.prize===this.index){clearTimeout(this.timer),this.prize=-1,this.times=0,this.speed=200,this.click=!0;var t=this;setTimeout(e=>{t.showToast=!0},500)}else{if(this.times<this.cycle)this.speed-=10;else if(this.times===this.cycle){const t=parseInt(10*Math.random(),0)||0;this.prize=t,this.prize>7&&(this.prize=7)}else this.times>this.cycle+10&&(0===this.prize&&7===this.index||this.prize===this.index+1)?this.speed+=110:this.speed+=20;this.speed<40&&(this.speed=40),this.timer=setTimeout(this.startRoll,this.speed)}},oneRoll(){let t=this.index;const e=this.count;t+=1,t>e-1&&(t=0),this.index=t}}},x=(s("4be6"),s("6b0d")),k=s.n(x);const _=k()(v,[["render",f]]);e["default"]=_},"4be6":function(t,e,s){"use strict";s("2ee9")}}]);