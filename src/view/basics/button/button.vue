<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<template>
    <div class="content">
        <a-alert message="button 样式来自 Color-ui  如有侵权，请联系删除" type="success" style="width:400px;" />
        <div class="red">
            color-ui 官网地址 <a href="https://github.com/weilanwl/ColorUI"
                target="_blank">https://github.com/weilanwl/ColorUI </a>
        </div>


        <div class="cyan margin-tb-1x">默认</div>
        <div class="flex flex-wrap">
            <div class="margin-tb-sm text-center margin-right-1x margin-bottom-1x" v-for="(item,index) in colorList"
                :key="index">
                <button class="color-btn" :class="'bg-'+item.name ">{{item.title}}</button>
            </div>
        </div>
        <div class="cyan margin-tb-1x">圆角</div>
        <div class="flex flex-wrap">
            <div class="margin-tb-sm text-center margin-right-1x margin-bottom-1x" v-for="(item,index) in colorList"
                :key="index">
                <button class="color-btn round" :class="'bg-'+item.name ">{{item.title}}</button>
            </div>
        </div>
        <div class="cyan margin-tb-1x">椭圆</div>
        <div class="flex flex-wrap">
            <div class="margin-tb-sm text-center margin-right-1x margin-bottom-1x" v-for="(item,index) in colorList"
                :key="index">
                <button class="color-btn radius" :class="'bg-'+item.name">{{item.title}}</button>
            </div>
        </div>
        <div class="cyan margin-tb-1x">浅底</div>
        <div class="flex flex-wrap">
            <div class="margin-tb-sm text-center margin-right-1x margin-bottom-1x" v-for="(item,index) in colorList"
                :key="index">
                <div class="color-btn light" :class="['bg-' + item.name,'face-'+item.name ]" >{{item.title}}</div>
            </div>
        </div>
        <div class="cyan margin-tb-1x">线条</div>
        <div class="flex flex-wrap">
            <div class="margin-tb-sm text-center margin-right-1x margin-bottom-1x " v-for="(item,index) in colorList"
                :key="index">
                <div class="color-tag " :class="'line-' + item.name"  >{{item.title}}</div>
            </div>
        </div>
        <div class="cyan margin-tb-1x">渐变</div>
        <div class="flex flex-wrap">
            <div class="margin-tb-sm text-center margin-right-1x margin-bottom-1x " v-for="(item,index) in colorList"
                :key="index">
                <div class="color-btn facebox" :class="'bg-gradual-' + item.name">{{item.title}}</div>
            </div>
        </div>
    </div>

</template>
<script setup>
    const colorList = [{
            title: '嫣红',
            name: 'red',
            color: '#e54d42'
        },
        {
            title: '桔橙',
            name: 'orange',
            color: '#f37b1d'
        },
        {
            title: '明黄',
            name: 'yellow',
            color: '#fbbd08'
        },
        {
            title: '橄榄',
            name: 'olive',
            color: '#8dc63f'
        },
        {
            title: '森绿',
            name: 'green',
            color: '#39b54a'
        },
        {
            title: '天青',
            name: 'cyan',
            color: '#1cbbb4'
        },
        {
            title: '海蓝',
            name: 'blue',
            color: '#0081ff'
        },
        {
            title: '姹紫',
            name: 'purple',
            color: '#6739b6'
        },
        {
            title: '木槿',
            name: 'mauve',
            color: '#9c26b0'
        },
        {
            title: '桃粉',
            name: 'pink',
            color: '#e03997'
        },
        {
            title: '棕褐',
            name: 'brown',
            color: '#a5673f'
        },
        {
            title: '玄灰',
            name: 'grey',
            color: '#8799a3'
        },
        {
            title: '草灰',
            name: 'gray',
            color: '#aaaaaa'
        },
        {
            title: '墨黑',
            name: 'black',
            color: '#333333'
        },
        {
            title: '雅白',
            name: 'white',
            color: '#ffffff'
        },
    ]
</script>
<style>
</style>