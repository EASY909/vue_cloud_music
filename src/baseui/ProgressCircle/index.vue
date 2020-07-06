<!--  -->
<template>
  <div class="CircleWrapper">
    <svg
      :width="radius"
      :height="radius"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
      <circle
        class="progress-bar"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "ProgressCircle",
  components: {},
  props: {
    percent: {
      type: Number,
      default: 0
    },
    radius: {
      type: Number,
      default: 0
    }
  },
  data() {
    //这里存放数据
    return {
      dashArray: Math.PI * 100
    };
  },
  //监听属性 类似于data概念
  computed: {
    dashOffset: function() {
      return (1 - this.percent) * this.dashArray;
    }
  },
  //监控data中的数据变化
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {}, //生命周期 - 创建之前
  watch: {
  },
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后 refs可以取到
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  deactivated() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

.CircleWrapper {
  position: relative;
  circle {
    stroke-width: 8px;
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke: $colorShadow;
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: $themeColor;
    }
  }
}
</style>