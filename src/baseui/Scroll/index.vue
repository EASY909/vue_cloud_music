<!--  -->
<template>
  <div ref="wrapper" class="ScrollContainer">
    <slot></slot>

    <div class="loding1">
      <Loading v-if="pullUpLoading" />
    </div>
    <div class="loding2">
      <LoadingV2 v-if="pullDownLoading" />
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import BScroll from "better-scroll";
import Loading from "@b/Loading";
import LoadingV2 from "@b/LoadingV2";
import { debounce } from "@/utils/index.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Scroll",
  components: {
    Loading,
    LoadingV2
  },
  props: {
    scrollconfig: {
      type: Object,
      default: () => {}
    },
    pullUpLoading: {
      type: Boolean,
      default: false
    },
    pullDownLoading: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    //这里存放数据
    return {
      scrollConfig: {
        eventPassthrough: "vertical",
        click: true,
        refresh: true,
        onScroll: true,
        pullUp: false,
        pullDown: false,
        pullUpLoading: false,
        pullDownLoading: false,
        bounceTop: true,
        bounceBottom: true
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    pullUpLoading(nv, ov) {
      this.pullUpLoading = nv;
    },
    pullDownLoading(nv, ov) {
      console.log(nv);
      this.pullDownLoading = nv;
    },
    data(nv) {
      // console.log(nv);
      this.$nextTick(() => {
        this.brefresh();
      });
    }
  },
  //方法集合
  methods: {
    _initScroll() {
      console.log(this.name + "新的scroll");
      if (!this.$refs.wrapper) {
        return;
      }

      for (const key in this.scrollconfig) {
        this.scrollConfig[key] = this.scrollconfig[key];
      }
      // better-scroll的初始化

      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollX: this.scrollConfig.eventPassthrough === "horizental",
        scrollY: this.scrollConfig.eventPassthrough === "vertical",
        probeType: 3,
        click: this.scrollConfig.click,
        bounce: {
          top: this.scrollConfig.bounceTop,
          bottom: this.scrollConfig.bounceBottom
        }
      });

      if (this.scrollConfig.onScroll) {
        this.scroll.on("scroll", pos => {
          // console.log(pos);
          this.$emit("onScroll", pos);
        });
      }

      // 是否派发滚动到底部事件，用于上拉加载
      if (this.scrollConfig.pullUp) {
        this.scroll.on("scrollEnd", () => {
          // 滚动到底部
          if (this.scroll.y <= this.scroll.maxScrollY + 100) {
            this.handlePullUp();
          }
        });
      }

      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.scrollConfig.pullDown) {
        this.scroll.on("touchEnd", pos => {
          // 下拉动作
          if (pos.y > 50) {
            this.handlePullDown();
          }
        });
      }
    },
    brefresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, 0, 0);
    },
    handlePullDown: debounce(function() {
      this.$emit("pullDown");
    }, 300),
    handlePullUp: debounce(function() {
      this.$emit("pullUp");
    }, 300)
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    console.log("scroll销毁");
    this.scroll && this.scroll.disable();
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {
    this.scroll && this.scroll.enable();
  },
  deactivated() {
    this.scroll && this.scroll.disable();
  }
  //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.ScrollContainer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.loding2 {
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
}

.loding1 {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
}
</style>