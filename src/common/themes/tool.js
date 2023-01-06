/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
export const colorMix = (color1, color2, weight) => {
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
  