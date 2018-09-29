// 在package.json中 
// "babel": {
//   "presets": [
//     "./.babelrc.js"
//   ]
// }
// 然后就可以用.babelrc.js(可以写注释及js操作 .babelrc只是json文件不能写注释)
module.exports = {
  presets: [
    // 配合babel-preset-mobx让mobx支持装饰器语法
    // 注意要写成["env", "mobx"], 不能是["env"], ["mobx"], 否则会报错 Cannot find module '@babel/core'
    ["env", "mobx"],
    "stage-0",
    "react"
  ],
  plugins: [
    // 引入ant必须
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }],
    "transform-runtime",
    "transform-decorators-legacy"
  ]
}