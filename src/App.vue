<template>
  <router-view></router-view>
</template>
  <script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  created() {},
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  deactivated() {}
};
</script>
<style lang="scss">
@font-face {
  font-family: "iconfont";
  src: url("assets/iconfont/iconfont.eot?t=1592919389111"); /* IE9 */
  src: url("assets/iconfont/iconfont.eot?t=1592919389111#iefix")
      format("embedded-opentype"),
    url("data:application/x-font-woff2;charset=utf-8;base64,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")
      format("woff2"),
    url("assets/iconfont/iconfont.woff?t=1592919389111") format("woff"),
    url("assets/iconfont/iconfont.ttf?t=1592919389111") format("truetype"),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url("assets/iconfont/iconfont.svg?t=1592919389111#iconfont") format("svg"); /* iOS 4.1-  */
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
