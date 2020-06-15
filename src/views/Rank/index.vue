<!--  -->
<template>
  <div class="Container">
    <Scroll>
      <div v-if="rankList.length!==0">
        <h1 class="offical">官方榜</h1>
        <!-- <h1 class="offical" :style="displayStyle"> 官方榜 </h1> -->
        <ul class="List">
          <li class="ListItem" v-for="item in officialList" :key="item.id">
            <div class="img_wrapper">
              <img :src="item.coverImgUrl" alt />
              <div class="decorate"></div>
              <span class="update_frequecy">{{item.updateFrequency}}</span>
            </div>

            <ul class="SongList" v-if="item.tracks.length">
              <li
                v-for="(ite,index) in item.tracks"
                :key="index"
              >{{index+1}}. {{ite.first}} - {{ite.second}}</li>
            </ul>
          </li>
        </ul>
        <h1 class="global">全球榜</h1>
        <ul class="List">
          <li class="ListItem" v-for="item in globalList" :key="item.id">
            <div class="img_wrapper img_wrappers">
              <img :src="item.coverImgUrl" alt />
              <div class="decorate"></div>
              <span class="update_frequecy">{{item.updateFrequency}}</span>
            </div>
          </li>
        </ul>
        
      </div>
      <Loading v-if="loading" />
    </Scroll>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Scroll from "@b/Scroll";
import Loading from "@b/Loading";
import { filterIndex } from "@/utils";
export default {
  name: "Rank",
  components: { Scroll, Loading },
  data() {
    //这里存放数据
    return {
      displayStyle: true,
      officialList: [],
      globalList: [],
      rankList:[],
      loading: true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getRankListDataDispatch() {
      this.$store.dispatch("Rank/getRankList").then(res => {
        this.rankList = res;
        this.loading = this.$store.getters["Rank/loading"];

        let globalStartIndex = filterIndex(res);
        this.officialList = res.slice(0, globalStartIndex);
        this.globalList = res.slice(globalStartIndex);
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getRankListDataDispatch();
  },
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
@import "../../styles/config.scss";
.Container {
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
  .offical,
  .global {
    margin: 10px 5px;
    padding-top: 15px;
    font-weight: 700;
    font-size: $fontSizeM;
    color: $fontColorDesc;
  }
  .List {
    margin-top: 10px;
    padding: 0 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    background: $backgroundColor;
    &::after {
      content: "";
      display: block;
      width: 32vw;
    }
    .ListItem {
      display: flex;
      padding: 3px 0;
      border-bottom: 1px solid $borderColor;
      .img_wrappers {
        width: 32vw !important;
        height: 32vw !important;
      }
      .img_wrapper {
        width: 27vw;
        height: 27vw;
        border-radius: 3px;
        position: relative;
        .decorate {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 35px;
          border-radius: 3px;
          background: linear-gradient(
            hsla(0, 0%, 100%, 0),
            hsla(0, 0%, 43%, 0.4)
          );
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 3px;
        }
        .update_frequecy {
          position: absolute;
          left: 7px;
          bottom: 7px;
          font-size: $fontSizeSs;
          color: $fontColorLight;
        }
      }
      .SongList {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 10px 10px;
        > li {
          font-size: $fontSizeS;
          color: grey;
        }
      }
    }
  }
}
</style>