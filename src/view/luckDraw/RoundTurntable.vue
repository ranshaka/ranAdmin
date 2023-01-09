<template>
  <div class="turntable" ref="turntable">
      <div class="myTurntable" :style="{transform: rotateAngle, transition: rotateTransition}">
        <canvas id="canvas" ref="canvas">
          当前浏览器版本过低,请使用其他浏览器尝试
        </canvas>
        <div>
          
        </div>
        <div class="prize-container">
          <div v-for="(item, index) in prizeData" :key="index" class="item" :style="getRotateAngle(index)">
            <slot name="item" :item="item"></slot>
          </div>
        </div>
      </div>
    </div>


</template>

<script>
  export default {
    name: 'round-turntable',
    mounted() {
      this.init();
    },
    props: {
      prizeData: {
        required: true
      },
      rotateCircle: {
        default: 6
      },
      turntableStyleOption: {
        default: () => {
          return {
            // 背景色
            prizeBgColors: ['#ffdfd4', '#fffdfe', '#ffdfd4', '#fffdfe', '#ffdfd4', '#fffdfe', '#ffdfd4', '#fffdfe'],
            // 转盘的外边框颜色
            borderColor: '#f9dc84'
          };
        }
      },
      duringTime: {
        default: 4.5
      }
    },
    data() {
      return {
        // 开始转动的角度
        startRotateDegree: 0,
        rotateAngle: 0,
        rotateTransition: ''
      };
    },
    methods: {
      // 根据index计算每一格要旋转的角度的样式
      getRotateAngle(index) {
        const angle = 360 / this.prizeData.length * index + (180 / this.prizeData.length);
        return {
          transform: `rotate(${angle}deg)`
        };
      },
      // 初始化圆形转盘canvas
      init() {
        // 各种数据
        const data = this.turntableStyleOption;
        const prizeNum = this.prizeData.length;
        const {
          prizeBgColors,
          borderColor
        } = data;
        // 开始绘画
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext('2d');
        const canvasW = this.$refs.canvas.width = this.$refs.turntable.clientWidth; // 画板的高度
        const canvasH = this.$refs.canvas.height = this.$refs.turntable.clientHeight; // 画板的宽度
        // translate方法重新映射画布上的 (0,0) 位置
        ctx.translate(0, canvasH);
        // rotate方法旋转当前的绘图,因为文字适合当前扇形中心线垂直的！
        ctx.rotate(-90 * Math.PI / 180);
        // 圆环的外圆的半径
        const outRadius = canvasW / 2;
        // 圆环的内圆的半径
        const innerRadius = 0;
        const baseAngle = Math.PI * 2 / prizeNum; // 计算每个奖项所占角度数
        ctx.clearRect(0, 0, canvasW, canvasH); // 去掉背景默认的黑色
        ctx.strokeStyle = borderColor; // 设置画图线的颜色
        for (let index = 0; index < prizeNum; index++) {
          const angle = index * baseAngle;
          ctx.fillStyle = prizeBgColors[index]; // 设置每个扇形区域的颜色
          ctx.beginPath(); // 开始绘制
          // 标准圆弧：arc(x,y,radius,startAngle,endAngle,anticlockwise)
          ctx.arc(canvasW * 0.5, canvasH * 0.5, outRadius, angle, angle + baseAngle, false);
          ctx.arc(canvasW * 0.5, canvasH * 0.5, innerRadius, angle + baseAngle, angle, true);
          ctx.stroke(); // 开始链线
          ctx.fill(); // 填充颜色
          ctx.save(); // 保存当前环境的状态
        }
      },
      // 转动起来
      rotate(index) {
        // 运转时长
        const duringTime = this.duringTime;
        const rotateAngle = this.startRotateDegree + this.rotateCircle * 360 + 360 - (180 / this.prizeData.length +
          360 / this.prizeData.length * index) - this.startRotateDegree % 360;
        this.startRotateDegree = rotateAngle;
        this.rotateAngle = `rotate(${rotateAngle}deg)`;
        this.rotateTransition = `transform ${duringTime}s cubic-bezier(0.250, 0.460, 0.455, 0.995)`;
        setTimeout(() => {
          this.$emit('endRotation');
        }, duringTime * 1000 + 500);
      }
    }
  };
</script>

<style scoped lang="scss">

  

  .turntable {
    .myTurntable {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .prize-container {
      position: absolute;
      left: 25%;
      top: 0;
      width: 50%;
      height: 50%;

      .item {
        /*background: pink;*/
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transform-origin: center bottom;
      }
    }
  }
</style>