<!--  -->
<template>
  <Scroll :scrollconfig="scrollconfig" name="HorizenItem" :data="data">
    <div ref="Category">
      <div class="HoriList">
        <span>{{title}}</span>
        <span
          :class="ListItem"
          @click="handleClick(item.key,$event)"
          v-for="item in list"
          :key="item.key"
        >{{item.name}}</span>
      </div>
    </div>
  </Scroll>
</template>

<script>
import Scroll from "../Scroll/index";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "HorizenItem",
  components: {
    Scroll
  },
  props: {
    list: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    //这里存放数据
    return {
      scrollconfig: {
        eventPassthrough: "horizental",
        click: true
      },
      ListItem: "ListItem",
      data:[]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleClick(val, event) {
      // this.oldVal=val;
      this.$emit("handleClick", val);

      let nodes = event.target.parentNode.children;
      [...nodes].forEach(item => {
        item.classList.remove("selected");
      });
      event.target.classList.add("selected");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    let categoryDOM = this.$refs.Category;
    let tagElems = categoryDOM.querySelectorAll("span");
    let totalWidth = 0;
    Array.from(tagElems).forEach(ele => {
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  },
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
.HoriList {
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  > span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: $fontSizeM;
    // vertical-align: middle;
  }
  .ListItem {
    flex: 0 0 auto;
    font-size: $fontSizeM;
    padding: 5px 8px;
    border-radius: 10px;
    &.selected {
      color: $themeColor;
      border: 1px solid $themeColor;
      opacity: 0.8;
    }
  }
}
</style>