<template>
    <div class="content minHeight100">
        <div class="lottery-box">
            <div class="lottery">
                <div class="lottery-item">
                    <div class="lottery-start">
                        <div class="box gray" v-if="isStart===0">
                            <p>活动未开始</p>
                        </div>
                        <div class="box" @click="startLottery" v-if="isStart===1">
                            <p><b>抽奖</b></p>
                            <p>消耗{{score}}积分</p>
                        </div>
                        <div class="box gray" v-if="isStart===2">
                            <p>活动已过期</p>
                        </div>
                    </div>
                    <ul>
                        <li v-for="(item,i) in list" :class="i==index?'on':''" :key="i">
                            <div class="box">
                                <p><img :src="item.img" alt /></p>
                                <p>{{item.title}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <a-modal v-model:visible="showToast" width="30%" @ok="showToast=false">
                <p><img style="width:100%;" src="https://joe.foshanlepin.com/lottery_draw/src/assets/img/j2.png" alt />
                </p>
                <template #title>
                    <div>获奖结果</div>
                </template>
                <h2 style="text-align: center">获得 {{list[index].title}}</h2>

            </a-modal>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isStart: 1,
                score: 10, //消耗积分
                list: [{
                        img: 'https://joe.foshanlepin.com/lottery_draw/src/assets/img/j1.png',
                        title: '谢谢参与'
                    },
                    {
                        img: 'https://joe.foshanlepin.com/lottery_draw/src/assets/img/j2.png',
                        title: '美女一个'
                    },
                    {
                        img: 'https://joe.foshanlepin.com/lottery_draw/src/assets/img/j1.png',
                        title: '宝马一辆'
                    },
                    {
                        img: 'https://joe.foshanlepin.com/lottery_draw/src/assets/img/j2.png',
                        title: '单车一辆'
                    },
                    {
                        img: 'https://joe.foshanlepin.com/lottery_draw/src/assets/img/j1.png',
                        title: '鸡蛋一蓝'
                    },
                    {
                        img: 'https://joe.foshanlepin.com/lottery_draw/src/assets/img/j2.png',
                        title: '500红包'
                    },
                    {
                        img: 'https://joe.foshanlepin.com/lottery_draw/src/assets/img/j1.png',
                        title: '靓号一个'
                    },
                    {
                        img: 'https://joe.foshanlepin.com/lottery_draw/src/assets/img/j2.png',
                        title: '鲜花一蓝'
                    }
                ], //奖品1-9     
                index: 0, // 当前转动到哪个位置，起点位置
                count: 8, // 总共有多少个位置
                timer: 0, // 每次转动定时器
                speed: 200, // 初始转动速度
                times: 0, // 转动次数
                cycle: 50, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
                prize: -1, // 中奖位置
                click: true,
                showToast: false, //显示中奖弹窗        
            }
        },

        mounted() {},

        methods: {
            startLottery() {
                if (!this.click) {
                    return
                }
                this.startRoll();
            },
            // 开始转动
            startRoll() {
                this.times += 1 // 转动次数
                this.oneRoll() // 转动过程调用的每一次转动方法，这里是第一次调用初始化 
                // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
                if (this.times > this.cycle + 10 && this.prize === this.index) {
                    clearTimeout(this.timer) // 清除转动定时器，停止转动
                    this.prize = -1
                    this.times = 0
                    this.speed = 200
                    this.click = true;
                    var that = this;
                    // eslint-disable-next-line no-unused-vars
                    setTimeout(res => {

                        that.showToast = true;
                    }, 500)
                } else {
                    if (this.times < this.cycle) {
                        this.speed -= 10 // 加快转动速度
                    } else if (this.times === this.cycle) {
                        const index = parseInt(Math.random() * 10, 0) || 0; // 随机获得一个中奖位置
                        this.prize = index; //中奖位置,可由后台返回 
                        if (this.prize > 7) {
                            this.prize = 7
                        }
                    } else if (this.times > this.cycle + 10 && ((this.prize === 0 && this.index === 7) || this.prize ===
                            this.index + 1)) {
                        this.speed += 110
                    } else {
                        this.speed += 20
                    }
                    if (this.speed < 40) {
                        this.speed = 40
                    }
                    this.timer = setTimeout(this.startRoll, this.speed)
                }
            },

            // 每一次转动
            oneRoll() {
                let index = this.index // 当前转动到哪个位置
                const count = this.count // 总共有多少个位置
                index += 1
                if (index > count - 1) {
                    index = 0
                }
                this.index = index
            },
        }


    }
</script>

<style>
    ul,
    li {
        list-style-type: none;
    }

    .lottery-box {
        overflow: hidden;
    }

    .lottery-box .title {
        text-align: center;
        padding: 50px 0;
        font-size: 18px;
        color: #fff;
    }

    .lottery {
        overflow: hidden;
        padding: 20px;
        width: 400px;
        margin: 0 auto;
        background: #12a3f5;
    }


    .lottery .lottery-item {
        height: 320px;
        position: relative;
    }

    .lottery .lottery-item ul li {
        width: 33%;
        position: absolute;
        margin-right: 10px;
    }

    .lottery .lottery-item ul li:nth-child(2) {
        left: 34%;
    }

    .lottery .lottery-item ul li:nth-child(3) {
        left: 68%;
    }

    .lottery .lottery-item ul li:nth-child(4) {
        left: 68%;
        top: 110px;
    }

    .lottery .lottery-item ul li:nth-child(5) {
        left: 68%;
        top: 220px;
    }

    .lottery .lottery-item ul li:nth-child(6) {
        left: 34%;
        top: 220px;
    }

    .lottery .lottery-item ul li:nth-child(7) {
        left: 0;
        top: 220px;
    }

    .lottery .lottery-item ul li:nth-child(8) {
        left: 0;
        top: 110px;
    }

    .lottery .lottery-item ul li .box {
        height: 100px;
        position: relative;
        text-align: center;
        overflow: hidden;
        background: #FFF;
        border-radius: 5px;
        ;
    }

    .lottery .lottery-item ul li .box img {
        display: block;
        height: 50px;
        margin: 0 auto;
        margin-top: 10px;
        margin-bottom: 5px;
    }

    .lottery .lottery-item ul li .box p {
        color: #708ABF;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
    }

    .lottery .lottery-item ul li.on .box {
        background: #f60;
    }

    .lottery .lottery-item ul li.on .box p {
        color: #fff;
    }

    .lottery .lottery-item .lottery-start {
        position: absolute;
        left: 34%;
        width: 33.33333333%;
        top: 110px;
    }

    .lottery .lottery-item .lottery-start .box {
        height: 100px;
        font-size: 14px;
        color: #FFF;
        cursor: pointer;
        text-align: center;
        overflow: hidden;
        background: #f60;
        border-radius: 5px;
        ;
    }

    .lottery .lottery-item .lottery-start .box p b {
        font-size: 40px;
        margin-top: 16px;
        margin-bottom: 15px;
        line-height: 30px;
        display: block;
    }

    .lottery .lottery-item .lottery-start .box:active {
        opacity: 0.7;
    }

    .lottery .lottery-item .lottery-start .box.gray {
        /* background: url(../../assets/images/404.png) no-repeat center;
    background-size: 100% 100%; */
    }

    .lottery .lottery-item .lottery-start .box.gray p {
        color: #708ABF;
        font-weight: bold;
    }

    .mask {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        position: fixed;
        overflow: hidden;
        z-index: 222;
        top: 0;
        left: 0;
    }

    .lottery-alert {
        max-width: 400px;
        text-align: center;
        z-index: 10000;
        border-radius: 10px;
        background: #fff;
        padding: 20px;
        position: fixed;
        left: 0;
        right: 0;
        margin: auto;
        top: 50%;
        transform: translateY(-50%);
    }

    .lottery-alert h1 {
        font-size: 18px;
        font-weight: bold;
        color: #D92B2F;
    }

    .lottery-alert img {
        display: block;
        height: 120px;
        margin: 0 auto;
    }

    .lottery-alert h2 {
        font-weight: normal;
        color: #D92B2F;
        font-size: 15px;
        padding-top: 15px;
    }

    .lottery-alert p {
        color: #666;
        font-size: 16px;
        padding-top: 5px;
    }

    .lottery-alert .btnsave {
        border-radius: 3px;
        box-shadow: none;
        height: 40px;
        cursor: pointer;
        line-height: 40px;
        color: #fff;
        margin-top: 12px;
        background: linear-gradient(180deg, rgba(213, 60, 63, 1) 0%, rgba(201, 20, 24, 1) 100%);
        font-size: 16px;
    }
</style>