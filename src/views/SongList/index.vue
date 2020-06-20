<!--  -->
<template>
  <div>
    <div class="SongList">
      <div class="first_line">
        <div class="play_all" @click="selectItem(0)">
          <i class="iconfont">&#xe695;</i>
          <span>
            播放全部
            <span class="sum">(共 {{mysong.length}} 首)</span>
          </span>
        </div>
        <!-- <div class="add_list">
          <i class="iconfont">&#xe6dc;</i>
          <span>收藏 ({{getCount(currentAlbum.subscribedCount)}})</span>
        </div>-->
      </div>

      <ul class="SongItem">
        <li :key="index" v-for="(item,index) in mysong">
          <span class="index">{{index + 1}}</span>
          <div class="info">
            <span>{{item.name}}</span>
            <span>{{ getName(item.ar)}} - {{item.al.name}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getName } from "@/utils";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "SongList",
  props: {
    song: {
      type: Array,
      default: []
    }
  },
  data() {
    //这里存放数据
    return {
      mysong: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    song(nv, ov) {
      this.mysong = nv;
    }
  },
  //方法集合
  methods: {
    getName(name) {
      return getName(name);
    },
    toggleFullScreen(value) {
      //   changePlayListDispatch(songs);
      //   changeSequecePlayListDispatch(songs);
      //   changeCurrentIndexDispatch(index);
      // console.log("显示小的");
      this.$store.commit("Player/changeFullScreen", value);
      this.$store.commit("Player/changeFullScreen", value);
      this.$store.commit("Player/changeFullScreen", value);
    },
    selectItem(index) {
      console.log(this.mysong);
      this.$store.commit("Player/changePlayList", this.mysong);
      this.$store.commit("Player/changeSequecePlayList", this.mysong);
      this.$store.commit("Player/changeCurrentIndex", index);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  created() {
    this.mysong = this.song;
  },
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
.SongList {
  border-radius: 10px;
  opacity: 1;
  background: $highlightBackgroundColor;
  .first_line {
    box-sizing: border-box;
    padding: 10px 0;
    margin-left: 10px;
    position: relative;
    justify-content: space-between;
    border-bottom: 1px solid $borderColor;
    .play_all {
      display: inline-block;
      line-height: 24px;
      color: $fontColorDesc;
      .iconfont {
        font-size: 24px;
        margin-right: 10px;
        vertical-align: top;
      }
      .sum {
        font-size: $fontSizeS;
        color: $fontColorDescV2;
      }
      > span {
        vertical-align: top;
      }
    }
    .add_list,
    .isCollected {
      display: flex;
      align-items: center;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 130px;
      line-height: 34px;
      background: $themeColor;
      color: $fontColorLight;
      font-size: 0;
      border-radius: 3px;
      vertical-align: top;
      .iconfont {
        vertical-align: top;
        font-size: 10px;
        margin: 0 5px 0 10px;
      }
      span {
        font-size: 14px;
        line-height: 34px;
      }
    }
    .isCollected {
      display: flex;
      background: $backgroundColor;
      color: $fontColorDesc;
    }
  }
  .SongItem {
    > li {
      display: flex;
      height: 60px;
      align-items: center;
      .index {
        flex-basis: 60px;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
      }
      .info {
        box-sizing: border-box;
        flex: 1;
        display: flex;
        height: 100%;
        padding: 5px 0;
        flex-direction: column;
        justify-content: space-around;
        border-bottom: 1px solid $borderColor;
        @include noWrap;
        > span {
          @include noWrap;
        }
        > span:first-child {
          color: $fontColorDesc;
        }
        > span:last-child {
          font-size: $fontSizeS;
          color: #bba8a8;
        }
      }
    }
  }
}
</style>