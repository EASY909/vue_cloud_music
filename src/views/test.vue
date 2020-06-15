<!--  -->
<template>
  <input type="text"
        :value="textvalue"
        @input="$emit('change', $event.target.value)"
    >
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  name:"Text",
  model: {
    prop: "textvalue", // 对应 props text1
    event: "change"
  },
  props: {
    textvalue: String,
    default() {
      return "";
    }
  },
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
input{
  width: 500px;
  height: 100px;
  background: red;
}
</style>