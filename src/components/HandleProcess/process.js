// 参考文章
// https://www.jianshu.com/p/514122716e38
// https://www.cnblogs.com/shandou/p/13812538.html
import Vue from 'vue' // 引入 Vue 是因为要用到 Vue.extend() 这个方法
import process from './index.vue' // 引入刚才的 toast 组件

let processConstructor = Vue.extend(process)
let instance

const Process = function(options = {}) {
    instance = new processConstructor({
        data: options // 这里的 data 会传到 message.vue 组件中的 data 中，当然也可以写在 props 里
    })
    document.body.appendChild(instance.$mount().$el) // 挂载到 body 下
    Vue.nextTick(() => {
        instance.visible = true
    })
}
export default Process
