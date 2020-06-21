<!--  -->
<template>
  <div :class="['content',{bottom:bottom}]">
    <Scroll :scrollconfig="scrollconfig" name="recommend" :data="data">
      <div>
        <Slider :bannerList="bannerList" />
        <RecommendList :recommendList="recommendList" />
      </div>
    </Scroll>
    <Loading v-if="loading" />

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Slider from "@c/Slider";
import Scroll from "@b/Scroll";
import RecommendList from "@c/List";
import Loading from "@b/Loading";

export default {
  name: "Recommend",
  //import引入的组件需要注入到对象中才能使用
  components: { Slider, Scroll, RecommendList, Loading },
  data() {
    //这里存放数据
    return {
      bannerList: [],
      recommendList: [],
      scrollconfig: {
        eventPassthrough: "vertical",
        click: true,
        refresh: true,
        onScroll: true,
        pullUp: true,
        pullDown: false,
        pullUpLoading: false,
        pullDownLoading: false,
        bounceTop: true,
        bounceBottom: true
      },
      loading: true,
      data: [],
      bottom: true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    "$store.state.Player.playList": {
      handler: function(nv) {
        console.log(nv.length);
        nv.length !== 0 ? (this.bottom = true) : (this.bottom = false);
      },
      immediate: true
    }
  },
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    if (!this.bannerList.length) {
      this.$store
        .dispatch("Recommend/getBannerList")
        .then(res => {
          this.bannerList = res;
          this.data = [...this.bannerList, ...this.recommendList];
        })
        .catch(error => {
          console.log(error);
        });
    }

    if (!this.recommendList.length) {
      this.$store
        .dispatch("Recommend/getRecommendList")
        .then(res => {
          this.recommendList = res;
          this.$store.commit("Recommend/changeEnterLoading", false);
          this.loading = this.$store.getters["Recommend/enterLoading"];
          this.data = [...this.bannerList, ...this.recommendList];
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
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
.content {
  position: fixed;
  top: 90px;
  bottom: 0px;
  width: 100%;
}
.bottom {
  bottom: 60px;
}
</style>