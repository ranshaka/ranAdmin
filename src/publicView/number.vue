
<template>
    <div style="display: flex;">
      <div v-for="(item, index) in numberList" :key="index" style="display: flex;">
        <span v-if="isNaN(item)">{{item}}</span>
        <div class="number" v-else>
          <span
            class="number-item"
            ref="numberItem"
            :data-number="item"
            :data-index="index"
          >0123456879</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: {
        type: [String, Number],
        default: 0
      }
    },
    watch: {
      value(newVal) {
        if (newVal) {
          this.$nextTick(() => {
            this.setNumberTransform();
          });
        }
      }
    },
    computed: {
      numberList() {
        return String(this.value).split("");
      }
    },
    data() {
      return {};
    },
    methods: {
      // 设置每一位数字的偏移
      setNumberTransform() {
        let numberItems = this.$refs.numberItem;
        let obj = {};
        Array.from(numberItems).forEach(c => {
          let key = c.dataset.index;
          let value = c.dataset.number;
          let init = 0;
          obj[key] = setInterval(() => {
            if (init < value * 10) {
              init += 1;
              c.style.transform = `translateY(-${init}%)`;
            } else {
              clearInterval(obj[key]);
              obj[key] = null;
            }
          }, 10);
        });
      }
    },
    mounted() {
      this.setNumberTransform();
    }
  };
  </script>
  
  <style scoped lang="less">
  .number {
    width: 20px;
    height: 19px;
    overflow: hidden;
    > span {
      writing-mode: vertical-rl;
      text-orientation: upright;
      transform: translateY(0%);
    }
  }
  </style>
  