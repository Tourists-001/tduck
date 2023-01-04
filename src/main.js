import Vue from 'vue'
import App from './App.vue'

// 库
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import Process from '@/components/HandleProcess/process' // 进度条

// 组件
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import meta from 'vue-meta'
import VueClipboard from 'vue-clipboard2' // 复制
import router from './router/index'
import store from './store/index'

// 导入api
import api from './api'

// global css
import '@/assets/styles/index.scss'

// utils
import '@/utils/plugins'

// 全局组件自动注册
import '@/components/autoRegister'

// icons
import './assets/icons'

// 在vue原型上添加包，可以无需导入在全局使用
Vue.prototype.$api = api
Vue.prototype.$dayjs = dayjs
Vue.prototype.$store = store
Vue.prototype.$cookies = Cookies
Vue.prototype.$process = Process
// 二次封装elementUi的消息提示
Vue.prototype.msgSuccess = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'success' })
}
Vue.prototype.msgError = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'error' })
}
Vue.prototype.msgWarning = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'warning' })
}
Vue.prototype.msgInfo = function(msg) {
  this.$message.info(msg)
}

// 使用插件
Vue.use(VueClipboard)
Vue.use(meta)
Vue.use(Element, { size: 'small', zIndex: 3000 })

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
