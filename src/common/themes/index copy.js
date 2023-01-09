/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
import themes from '@/common/themes/themes.js'
export const changeTheme=(theme)=>{
     // themes 对象包含 defaultTheme、darkTheme 两个属性即默认主题与深色主题
     const currentSkinName = theme || 'defaultTheme'
     window.localStorage.setItem("themes", currentSkinName)
     var  themeObj = themes[currentSkinName]
     themeObj=getsTheColorScale(themeObj)
     // 设置css 变量
     Object.keys(themeObj).map(item => {
         document.documentElement.style.setProperty(item, themeObj[item])
     })
}

 // 获取色阶
const getsTheColorScale = (themeObj) => {
  const colorList = ['primary', 'success', 'warning', 'danger', 'error', 'info']
  const prefix = '--el-color-'
  colorList.map(colorItem => {
      for (let i = 1; i < 10; i += 1) {
          if (i === 2) {
              // todo 深色变量生成未完成 以基本色设置
              themeObj[`${prefix}${colorItem}-dark-${2}`] = colorMix(themeObj
                  [`${prefix}black`], themeObj[
                      `${prefix}${colorItem}`], 1)
          } else {
              themeObj[`${prefix}${colorItem}-light-${10 - i}`] = colorMix(
                  themeObj[`${prefix}white`], themeObj[
                      `${prefix}${colorItem}`], i * 0.1)
          }
      }
  })
  return themeObj
}

export const colorChange = (e) => {
    // e就是选择了的颜色
    const pre = "--el-color-primary";
    const colorList = ['primary', 'success', 'warning', 'danger', 'error', 'info']
    
    // 白色混合色
    const mixWhite = "#ffffff";
    // 黑色混合色
    const mixBlack = "#000000";
    const el = document.documentElement;
    el.style=""
    el.style.setProperty(pre, e);
    // 这里是覆盖原有颜色的核心代码
    for (let i = 1; i < 10; i += 1) {
        el.style.setProperty(`${pre}-light-${i}`, colorMix(e, mixWhite, i * 0.1));
    }
    el.style.setProperty("--el-color-primary-dark", colorMix(e, mixBlack, 0.1));
}

const colorMix = (color1, color2, weight) => {
  weight = Math.max(Math.min(Number(weight), 1), 0)
  let r1 = parseInt(color1.substring(1, 3), 16)
  let g1 = parseInt(color1.substring(3, 5), 16)
  let b1 = parseInt(color1.substring(5, 7), 16)
  let r2 = parseInt(color2.substring(1, 3), 16)
  let g2 = parseInt(color2.substring(3, 5), 16)
  let b2 = parseInt(color2.substring(5, 7), 16)
  let r = Math.round(r1 * (1 - weight) + r2 * weight)
  let g = Math.round(g1 * (1 - weight) + g2 * weight)
  let b = Math.round(b1 * (1 - weight) + b2 * weight)
  r = ("0" + (r || 0).toString(16)).slice(-2)
  g = ("0" + (g || 0).toString(16)).slice(-2)
  b = ("0" + (b || 0).toString(16)).slice(-2)
  return "#" + r + g + b;
}
