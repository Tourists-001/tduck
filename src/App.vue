<template>
  <div id="app">
    <RouterView v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  watch: {
    // 检测路由的变化，如果之前的路由和改变后的路由相同，则重新加载
    $route: function(newVal, oldVal) {
      // console.log(newVal,oldVal)
      if (newVal.name === oldVal.name) {
        this.reload()
      }
    }
  },
  methods: {
    reload() {
      // 先设置根入口的 false， 在渲染结束后再设为true,防止有的组件没有加载完成
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  },
  // 设置标题，titleTemplate 如果下面没有title，则使用这的title，
  // 这里使用函数，下面title则直接传值，就可以分别设置 d 和 p 不同环境的title
  metaInfo: {
    titleTemplate: (title) => {
      return title
        ? `${title} - ${process.env.VUE_APP_TITLE}`
        : process.env.VUE_APP_TITLE
    }
  }
}
</script>

<style></style>
