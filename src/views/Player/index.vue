<!--  -->
<template>
  <div>
    <MiniPlayer :song="currentSong"></MiniPlayer>
    <NormalPlayer :song="currentSong" :fullScreen="fullScreen"></NormalPlayer>
  </div>
</template>

<script>
import MiniPlayer from "./miniPlayer";
import NormalPlayer from "./normalPlayer";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Player",
  components: { MiniPlayer, NormalPlayer },
  data() {
    //这里存放数据
    return {
      currentSong: {
        al: {
          picUrl:
            "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg"
        },
        name: "木偶人",
        ar: [{ name: "薛之谦" }]
      },
      fullScreen: this.$store.state.Player.fullScreen
    };
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
</style>