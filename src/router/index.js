import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

Vue.use(Router)

/**
 * 因为路由有优先级的概念，先定义的路由回先匹配到，而自动注册是根据文件名来遍历的
 * 所以下面这种情况，如果访问 /news/edit, 会指向 info.vue页面上
 * a.js   /news/:id   info.vue
 * b.js   /news/edit   edit.vue
 * 为避免这种情况发生，同一模块下的路由必须放在一个路由配置文件里
 * 按上面的栗子，news 模块的路由应该放到一个类似 news.js的配置文件里
 * 至于模块里面的优先级，可以把 /news/edit 放在/news/：id前面，或者把/news/:id 改成 /news/info/:id 均可
 */
const routes = []
/**
 * resolve 是一个函数，它返回请求被解析后得到的模块 id。
  * keys 也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成。
  * id 是上下文模块里面所包含的模块 id. 它可能在你使用 module.hot.accept 的时候被用到
 */
const require_module = require.context('./modules', false, /.js$/)
require_module.keys().forEach(file_name => {
  routes.push(require_module(file_name).default)
})
// console.log(routes)

const router = new Router({
  mode: 'history',
  // 因为现在的routes是一个二维数组，所以需要数组扁平化
  routes: routes.flat() // 按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回
})
// console.log(routes.flat())
// 重写push方法, 低版本的router在多次点击的时候控制台会报错，通过重写push和replace方法，在控制台上屏蔽错误
const originPush = Router.prototype.push
const originReplace = Router.prototype.replace
Router.prototype.push = function(location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {
      // console.log(e)
    })
  }
}
Router.prototype.replace = function(location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {
      // console.log(e)
    })
  }
}

// 前置导航
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 判断是否需要登录
  if (to.meta.requireLogin) {
    // 需要登陆,并且已经登录了
    if (store.getters['user/isLogin']) {
      next()
      NProgress.done()
    } else {
      // 需要登录但是没登录
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
      NProgress.done()
    }
  } else {
    // 不需要登录，直接放行
    next()
    NProgress.done()
  }
})

// 后置守卫，防止NProgress没有结束
router.afterEach(() => {
  NProgress.done()
})

// 默认导出路由到main.js中进行挂载
export default router
