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
    if(!e)return
    // e就是选择了的颜色
    const pre = "--el-color";
    const el = document.documentElement;
    el.style=""
    
    const colorList = ['primary']
    for(let x=0;x<colorList.length;x++){
          // 白色混合色
        const mixWhite = "#ffffff";
        // 黑色混合色
        const proActive=pre+'-'+colorList[x]
        el.style.setProperty(proActive, e);
        // 这里是覆盖原有颜色的核心代码
        for (let i = 1; i < 11; i += 1) {
            el.style.setProperty(`${proActive}-light-${i}`, colorMix(e, mixWhite, i * 0.1));
        }
    }
  

    const mixBlack = "#000000";
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

// 自定义颜色  配置其他色系
const genColorHtml=(type='H')=>{
    let max=360
            var hex = "#12a3f5"
            var step =5
            try {
                step = parseInt(step);
            } catch(e){
                step = 0;
            }
            if(step < 1){
                alert('步进值必须大于 0');
                return;
            }
            var hsl = ColorUtil.rgb2hsl(ColorUtil.hex2rgb(hex));
            console.log(hsl)
            var start = hsl[type]%step;
            var hexArray = [];
            for (let i = start; i < max; i+=step) {
                hsl[type] = i/max;
                hexArray.push(ColorUtil.rgb2hex(ColorUtil.hsl2rgb(hsl)));
            }
            if (hex[0] != '#') {
                hex = '#' + hex;
            }
            hex = hex.toUpperCase();
    console.log(hexArray)
}
var ColorUtil = (function () {
    function rgb2hsl({ R, G, B }) {
        var H, S, L;
        var var_R = (R / 255);
        var var_G = (G / 255);
        var var_B = (B / 255);

        var var_Min = Math.min(var_R, var_G, var_B)    //Min. value of RGB
        var var_Max = Math.max(var_R, var_G, var_B)    //Max. value of RGB
        var del_Max = var_Max - var_Min             //Delta RGB value

        var L = (var_Max + var_Min) / 2

        if (del_Max == 0)                     //This is a gray, no chroma...
        {
            H = 0
            S = 0
        }
        else                                    //Chromatic data...
        {
            if (L < 0.5) S = del_Max / (var_Max + var_Min)
            else S = del_Max / (2 - var_Max - var_Min)

            var del_R = (((var_Max - var_R) / 6) + (del_Max / 2)) / del_Max
            var del_G = (((var_Max - var_G) / 6) + (del_Max / 2)) / del_Max
            var del_B = (((var_Max - var_B) / 6) + (del_Max / 2)) / del_Max

            if (var_R == var_Max) H = del_B - del_G
            else if (var_G == var_Max) H = (1 / 3) + del_R - del_B
            else if (var_B == var_Max) H = (2 / 3) + del_G - del_R

            if (H < 0) H += 1
            if (H > 1) H -= 1
        }
        return { H, S, L };
    }

    function Hue_2_RGB(v1, v2, vH) {
        if (vH < 0) vH += 1;
        if (vH > 1) vH -= 1;
        if ((6 * vH) < 1) return (v1 + (v2 - v1) * 6 * vH);
        if ((2 * vH) < 1) return (v2);
        if ((3 * vH) < 2) return (v1 + (v2 - v1) * ((2 / 3) - vH) * 6);
        return v1;
    }

    function hsl2rgb({ H, S, L }) {
        var R, G, B;
        if (S == 0) {
            R = L * 255;
            G = L * 255;
            B = L * 255;
        }
        else {
            var var_2, var_1;
            if (L < 0.5) var_2 = L * (1 + S);
            else var_2 = (L + S) - (S * L);

            var_1 = 2 * L - var_2;

            R = Math.round(255 * Hue_2_RGB(var_1, var_2, H + (1 / 3)));
            G = Math.round(255 * Hue_2_RGB(var_1, var_2, H));
            B = Math.round(255 * Hue_2_RGB(var_1, var_2, H - (1 / 3)));
        }
        return { R, G, B };
    }

    function hex2rgb(hex) {
        if (hex.indexOf('#') != -1) {
            hex = hex.substr(1, 6);
        }
        var R = parseInt(hex.substr(0, 2), 16);
        var G = parseInt(hex.substr(2, 2), 16);
        var B = parseInt(hex.substr(4, 2), 16);
        return { R, G, B };
    }

    function rgb2hex({ R, G, B }) {
        return '#' + dec2hex(R) + dec2hex(G) + dec2hex(B);
    }

    function dec2hex(dec) {
        return (dec + 0x100).toString(16).substr(1, 2).toUpperCase();
    }

    return {
        rgb2hsl,
        hsl2rgb,
        hex2rgb,
        rgb2hex
    }
})();