<!--  -->
<template>
  <div>
    <div class="NavContainer">
      <Horizen :list="categoryTypes" title="分类 (默认热门):" @handleClick="handleUpdateCatetory" />
      <Horizen :list="alphaTypes" title="首字母:" @handleClick="handleUpdateAlpha" />
    </div>
    <div class="ListContainer">
      <Scroll :scrollconfig="scrollconfig">
        <div class="List">
          <div class="ListItem" v-for="(item) in singerList" :key="item.accountId">
            <div class="img_wrapper">
              <img :src="item.picUrl+'?param=300x300'" width="100%" height="100%" alt="music" />
            </div>
            <span class="name">{{item.name}}</span>
          </div>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Horizen from "@b/HorizenItem";
import Scroll from "@b/Scroll";
import { categoryTypes, alphaTypes } from "@/api/config";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Singers",
  components: { Horizen, Scroll },
  data() {
    //这里存放数据
    return {
      categoryTypes,
      alphaTypes,
      cate: "",
      alpha: "",
      singerList: this.$store.getters["Singers/singerList"],
      scrollconfig: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // singerList(nv,ov){
    // }
  },
  //方法集合
  methods: {
    handleUpdateCatetory(val) {
      this.cate = val;
      this.updateDispatch(val, this.alpha);
      console.log(val);
    },
    handleUpdateAlpha(val) {
      console.log(val);
      this.alpha = val;
      this.updateDispatch(this.cate, val);
    },
    getHotSingerDispatch() {
      this.$store.dispatch("Singers/getHotSingerList").then(res => {
        this.singerList = res;
      });
    },
    updateDispatch(category, alpha) {
      console.log(11);
      let reqData = {
        category,
        alpha
      };
      this.$store.commit("Singers/changePageCount", 0);
      this.$store.commit("Singers/changeEnterLoading", true);
      this.$store.dispatch("Singers/getSingerList", reqData).then(res => {
        this.singerList = res;
      });
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      this.$store.commit("Singers/changePullUpLoading", true);
      this.$store.commit("Singers/changePageCount", count + 1);
      if (hot) {
        this.$store.dispatch("Singers/refreshMoreHotSingerList");
      } else {
        let reqData = {
          category,
          alpha
        };
        this.$store.dispatch("Singers/refreshMoreSingerList", reqData);
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getHotSingerDispatch();
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

.NavContainer {
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
}
.ListContainer {
  position: fixed;
  top: 160px;
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
  .List {
    display: flex;
    margin: auto;
    flex-direction: column;
    overflow: hidden;
    .title {
      margin: 10px 0 10px 10px;
      color: $fontColorDesc;
      font-size: $fontSizeS;
    }
    .ListItem {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      margin: 0 5px;
      padding: 5px 0;
      align-items: center;
      border-bottom: 1px solid $borderColor;
      .img_wrapper {
        margin-right: 20px;
        img {
          border-radius: 3px;
          width: 50px;
          height: 50px;
        }
      }
      .name {
        font-size: $fontSizeM;
        color: $fontColorDesc;
        font-weight: 500;
      }
    }
  }
}
</style>