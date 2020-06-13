<!--  -->
<template>
  <div class="NavContainer">
    <Horizen :list="categoryTypes" :oldVal="cate" title="分类 (默认热门):" @handleClick="handleUpdateCatetory" />
    <Horizen :list="alphaTypes" :oldVal="alpha" title="首字母:" @handleClick="handleUpdateAlpha" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Horizen from "@b/HorizenItem";
import { categoryTypes, alphaTypes } from "@/api/config";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Singers",
  components: { Horizen },
  data() {
    //这里存放数据
    return {
      categoryTypes,
      alphaTypes,
      cate: "",
      alpha: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleUpdateCatetory(val) {
      this.cate = val;
    },
    handleUpdateAlpha(val) {
      this.alpha = val;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.NavContainer {
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
}
</style>