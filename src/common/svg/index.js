//下面这个是导入svgIcon/svg下的所有svg文件
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
const req = require.context('./icon', false, /\.svg$/)
/*
 第一个参数是:'./svg' => 需要检索的目录，
 第二个参数是：false => 是否检索子目录,
 第三个参数是: /\.svg$/ => 匹配文件的正则
*/
requireAll(req)
