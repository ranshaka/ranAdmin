/*
 * @name: 防抖
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
export const debounce = {
  mounted: function (el, binding) {
    let timer
    el.addEventListener('keyup', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, 1000)
    })
  },
}

