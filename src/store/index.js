import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modules = {}

const require_module = require.context('./modules', false, /.js$/)
require_module.keys().forEach(file_name => {
  // 该文件的上下文，也就是这个文件的内容，注意文件需要用 default导出
  // console.log(require_module(file_name).default)
  // slice(2, -3) 如果该参数为负数，则它表示在原数组中的倒数第几个元素结束抽取
  modules[file_name.slice(2, -3)] = require_module(file_name).default
})

export default new Vuex.Store({
  modules: modules,
  strict: process.env.NODE_ENV !== 'production' // 在production环境里开启严格模式
})
