/*
 * @name: 图片放大
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
export const maxImg = {
  mounted(el, binding, vnode) {
    function clickHandler(e) {
      // 判断指令中是否绑定了函数
      // if (binding.expression) {
      //   // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
      //   binding.value(e)
      // }
      let bigImgBox=null;
      let bigImgNodes=null
  
      if (!document.getElementById('bigImgNode')) {
        let bigImgNode = document.createElement('img')
        bigImgNode.src = el.currentSrc
        bigImgNode.id = 'bigImgNode'
        // if (binding.value.callback) {
        //   binding.value.callback(true)
        // }

        bigImgBox = document.createElement('div')
        bigImgBox.className = 'big-img-box'
        bigImgBox.id = 'bigImgBox'
        bigImgBox.appendChild(bigImgNode)
        document.body.appendChild(bigImgBox)
        bigImgNodes = document.getElementById('bigImgNode')
        bigImgBox.addEventListener('click', (event) => {
          bigImgBox.style.display = 'none'
          if (binding.value.callback) {
            binding.value.callback(false)
          }
        })
      } else {
        bigImgBox = document.getElementById('bigImgBox')
        bigImgBox.style.display = 'block'
         bigImgNodes = document.getElementById('bigImgNode')
        bigImgNodes.src = el.currentSrc
        if (binding.value.callback) {
          binding.value.callback(true)
        }
      }
      bigImgBox.style=`
        position: fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background:rgba(0, 0, 0, 0.3)
      `
      bigImgNodes.style=`
        position: relative;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
      `
    }
    el.__vueClickOutside__ = clickHandler
    el.addEventListener('click', clickHandler)
  },
  update() {},
  beforeMounted(el, binding) {
    // 解除事件监听
    el.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }

}

