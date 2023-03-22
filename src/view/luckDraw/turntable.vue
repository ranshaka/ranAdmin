<template>
    <div class="content minHeight100">
        <div style="width:300px;margin:50px auto">
            <h4>剩余抽奖次数:{{ num }}</h4>
            <div class="turntableBox">
                <img @click="startRotation" src="https://img-blog.csdnimg.cn/20201020115304356.png#pic_center"
                    class="RoundTurntableImg" alt="">
                <RoundTurntable ref="roundTurntable" :prizeData="prizeData" :rotateCircle="rotateCircle"
                    :duringTime="duringTime" :turntableStyleOption="turntableStyleOption" @endRotation="endRotation"
                    class="turntable">
                    <template #item="scope">
                        <div class="turntable-name">{{ scope.item.level }}</div>
                        <div class="turntable-img">
                            <img :src="scope.item.picture" />
                        </div>
                    </template>
                </RoundTurntable>
            </div>
        </div>
    </div>
</template>

<script>
    import RoundTurntable from '@/view/luckDraw/RoundTurntable';
    export default {
        name: 'lattice',
        components: {
            RoundTurntable
        },
        data() {
            return {
                // 转盘上的奖品数据
                prizeData: [{
                        id: 1,
                        level: '2000元京东券',
                        picture: '../../assets/images/user.jpg'
                    },
                    {
                        id: 2,
                        level: '300元京东券',
                        picture: '../../assets/images/user.jpg'
                    },
                    {
                        id: 3,
                        level: '50个比特币',
                        picture: '../../assets/images/user.jpg'
                    },
                    {
                        id: 4,
                        level: '50元话费券',
                        picture: '../../assets/images/user.jpg'
                    },
                    {
                        id: 5,
                        level: '100元话费券',
                        picture: '../../assets/images/user.jpg'
                    },
                    {
                        id: 6,
                        level: '100个比特币',
                        picture: '../../assets/images/user.jpg'
                    },
                    {
                        id: 7,
                        level: '100个比特币',
                        picture: '../../assets/images/user.jpg'
                    },
                    {
                        id: 8,
                        level: '100个比特币',
                        picture: '../../assets/images/user.jpg'
                    }
                ],
                // 转动的圈数
                rotateCircle: 6,
                // 转动需要持续的时间（s）
                duringTime: 4.5,
                // 转盘样式的选项
                turntableStyleOption: {
                    // 背景色
                    prizeBgColors: ['#ffe0d6', '#fffdfe', '#ffe0d6', '#fffdfe', '#ffe0d6', '#fffdfe', '#ffe0d6',
                        '#fffdfe'
                    ],
                    // 转盘的外边框颜色
                    borderColor: '#fede87'
                },
                // 中奖的奖品的index
                prizeIndex: -1,
                // 用来锁定转盘，避免同时多次点击转动
                isLocking: false,
                // 剩余抽奖次数
                num: 5
            };
        },
        methods: {
            // 开始抽奖
            startRotation() {
                // 如果还不可以转动
                if (!this.canBeRotated()) {
                    return false;
                }
                // 开始转动
                // 先上锁
                this.isLocking = true;
                // 设置在哪里停下，应该与后台交互，这里随机抽取0~5
                const index = Math.floor(Math.random() * this.prizeData.length);
                // 成功后次数减少一次
                this.num--;
                this.prizeIndex = index;
                // 告诉子组件，开始转动了
                this.$refs.roundTurntable.rotate(index);
            },
            // 已经转动完转盘触发的函数
            endRotation() {
                // 提示中奖
                alert(`恭喜您获奖啦,您的奖品是;${this.prizeData[this.prizeIndex].level}`);
                // 解锁
                this.isLocking = false;
            },
            // 判断是否可以转动
            canBeRotated() {
                if (this.num <= 0) {
                  alert('已经木有次数啦!');
                  return false;
                }
                if (this.isLocking) {
                    return false;
                }
                return true;
            }
        }
    };
</script>

<style lang="scss">
    .turntableBox {
        position: relative;
        width: 300px;
        height: 300px;
        .RoundTurntableImg {
            width: 50px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            cursor: pointer;
        }
    }

    .turntable {
        position: absolute;
        //   left: calc(50% - 145px);
        //   top: calc(50% - -10px);
        width: 300px;
        height: 300px;
    }

    .turntable-name {
        /*background: pink;*/
        position: absolute;
        left: 10px;
        top: 20px;
        width: calc(100% - 20px);
        font-size: 14px;
        text-align: center;
        //   color: #fff;
        color: aqua;
    }

    .turntable-img {
        position: relative;
        /*要居中就要50% - 宽度 / 2*/
        left: calc(70% - 100px / 2);
        top: 40px;
        width: 60px;
        height: 60px;

        img {
            display: inline-block;
            width: 60%;
            height: 60%;
        }
    }

</style>