/*
 * @name: name
 * @description: 实现页面水印 v-waterMarker
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
// 1.使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等。
// 2.将其设置为背景图片，从而实现页面或组件水印效果
{/* <template>
  <div v-waterMarker="{text:'Francis版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"></div>
</template> */}

/**
 * @description:  
 * @param {*} str  水印文字，
 * @param {*} parentNode  父元素
 * @param {*} font  字体
 * @param {*} textColor  文字颜色
 * @return {*}
 */
function addWaterMarker(str, parentNode, textColor,styles) {
  let style={
    width:150,
    height:60,
    rotate:-20,
    ...styles
  }
  // 水印文字，父元素，字体，文字颜色
  var can = document.createElement('canvas')
  parentNode.appendChild(can)
  can.width = style.width
  can.height = style.height
  can.style.display = 'none' 
  var cans = can.getContext('2d')
  cans.rotate(((style.rotate || 0 )* Math.PI) / 180)
  cans.font =  '16px Microsoft JhengHei'
  cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle'
  cans.fillText(str, can.width / 10, can.height / 2)
  parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
}

export const waterMarker = {
  mounted(el, binding) {
    addWaterMarker(binding.value.text, el, binding.value.textColor,binding.value.styles)
  },
}

 
