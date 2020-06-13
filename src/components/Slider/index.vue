<!--  -->
<template>
  <div class="SliderContainer">
    <div class="slider-container">
      <div class="swiper-wrapper">
        <div v-for="(slider,index) in bannerList" class="swiper-slide" :key="index">
          <div class="slider-nav">
            <img :src="slider.imageUrl" width="100%" height="100%" alt="推荐" />
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="before"></div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import Swiper from "swiper";
import "swiper/css/swiper.css";
export default {
  name: "Slider",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    bannerList: {
      type: Array,
      default: [1]
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
  updated() {
    if (this.bannerList.length !== 0) {
      let newSliderSwiper = new Swiper(".slider-container", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: { el: ".swiper-pagination" }
      });
    }
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
@import "../../styles/config.scss";
.SliderContainer {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  background: white;
  .before {
    position: absolute;
    top: -300px;
    height: 400px;
    width: 100%;
    background: $themeColor;
  }
  .slider-container {
    position: relative;
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    border-radius: 6px;
    .slider-nav {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }

    .swiper-pagination-bullet-active {
      background: $themeColor !important;
    }
  }
}
</style>