/**
 * 全局组件自动注册
 *
 * 全局组件各个组件按文件夹区分，文件夹名称与组件名无关，但建议与组件名保持一致
 * 文件夹内至少保留一个文件名为index的组件入口，例如Verify.vue
 * 普通组件必须设置name并保留其唯一，自动注册会将组件的name设置为组件名，可以参考SvgIcon组件写法
 * 如果组件是通过js进行调用，则确保其入口文件为verifition-api.js，可参考 ExampleNotice 组件
 * 不自动注册 则名字为其他
 */

import Vue from 'vue'

const componentsContext = require.context('./', true, /index.(vue|js)$/)
// console.log(componentsContext)

componentsContext.keys().forEach(file_name => {
  // 获取文件中的 default 模块
  const componentConfig = componentsContext(file_name).default
  if (/.vue$/.test(file_name)) {
    Vue.component(componentConfig.name, componentConfig)
  } else if (/.js/.test(file_name)) {
    Vue.use(componentConfig)
  }
})
