<!--  -->
<template>
  <div class="Loading">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <span>拼命加载中...</span>
  </div>
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
<style lang='scss' scoped>
//@import url(); 引入公共css类
@import "../../styles/config.scss";

.Loading {
    height: 10px;
    width: 100%;
    margin: auto;
    text-align: center;
    font-size: 10px;
    >div {
      display: inline-block;
      background-color: $themeColor;
      height: 100%;
      width: 1px;
      margin-right:2px;
      animation: dance 1s infinite;
    }
    >div:nth-child(2) {
      animation-delay: -0.4s;
    }
    >div:nth-child(3) {
      animation-delay: -0.6s;
    }
    >div:nth-child(4) {
      animation-delay: -0.5s;
    }
    >div:nth-child(5) {
      animation-delay: -0.2s;
    } 
}
@keyframes dance {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    transform-origin: center 100%;
  }
  20% {
    transform: scaleY(1);
  }
}
</style>