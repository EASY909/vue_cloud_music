<!--  -->
<template>
  <div class="HeaderContainer">
    <i class="iconfont back" @click="handleClick">&#xe503;</i>
    <marquee v-if="my_isMarquee">
      <h1>{{my_title}}</h1>
    </marquee>
    <h1 v-else>{{my_title}}</h1>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Header",
  props: {
    title: {
      type: String,
      default: "返回"
    },
    isMarquee: {
      type: Boolean,
      default: false
    }
  },
  data() {
    //这里存放数据
    return {
      my_isMarquee: false,
      my_title: "返回"
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    isMarquee(nv, ov) {
      this.my_isMarquee = nv;
    },
    title(nv, ov) {
      this.my_title = nv;
    }
  },
  //方法集合
  methods: {
    handleClick() {
      this.$router.go(-1);
    }
  },
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
.HeaderContainer {
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: $fontColorLight;
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  > h1 {
    font-size: $fontSizeL;
    font-weight: 700;
  }
}
</style>