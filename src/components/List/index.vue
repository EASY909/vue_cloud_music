<!--  -->
<template>
  <div class="ListWrapper">
    <h1 class="title">推荐歌单</h1>
    <div class="List">
      <div class="ListItem" v-for="item in recommendList" :key="item.id" @click.stop="enterDetail(item.id)">
        <div class="img_wrapper">
          <div class="decorate"></div>
          <!-- <img v-lazy="item.picUrl + `?param=300x300`" /> -->
         <div v-lazy-container="{ selector: 'img', loading: imgUrl }">
            <img :data-src="item.picUrl+ `?param=300x300`"  width="100%" height="100%" alt="music">
          </div>
          <div class="play_count">
            <i class="iconfont play">&#xe685;</i>
            <span class="count">{{mygetCount(item.playCount)}}</span>
          </div>
        </div>
        <div class="desc">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCount } from "@/utils";
export default {
  //import引入的组件需要注入到对象中才能使用
  name:"RecommendList",
  props: {
    recommendList: {
      type: Array,
      default: []
    }
  },
  data() {
    //这里存放数据
    return {
      imgUrl: require("@/assets/music.png")
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    mygetCount(count) {
      return getCount(count);
    },
    enterDetail(id){
      this.$router.push({
        path:`/recommend/${id}`
      })
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
.ListWrapper {
  max-width: 100%;
  .title {
    font-weight: 700;
    padding-left: 6px;
    font-size: 14px;
    line-height: 60px;
  }
  .List {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    .ListItem {
      position: relative;
      width: 32%;
      .img_wrapper {
        .decorate {
          position: absolute;
          top: 0;
          width: 100%;
          height: 35px;
          border-radius: 3px;
          background: linear-gradient(
            hsla (0, 0%, 43%, 0.4),
            hsla (0, 0%, 100%, 0)
          );
        }
        position: relative;
        height: 0;
        padding-bottom: 100%;
        .play_count {
          position: absolute;
          right: 2px;
          top: 2px;
          font-size: $fontSizeS;
          line-height: 15px;
          color: $fontColorLight;
          .play {
            vertical-align: top;
          }
        }
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 3px;
        }
      }
      .desc {
        overflow: hidden;
        margin-top: 2px;
        padding: 0 2px;
        height: 50px;
        text-align: left;
        font-size: $fontSizeS;
        line-height: 1.4;
        color: $fontColorDesc;
      }
    }
  }
}
</style>