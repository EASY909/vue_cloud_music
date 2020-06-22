<!--  -->
<template>
  <transition name="slide-fade" v-if="showPlayList">
    <div class="PlayListWrapper" ref="playListRef" @click="handleTogglePlayList">
      <div
        class="list_wrapper"
        ref="listWrapperRef"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div class="ListHeader">
          <h1 class="title">
            <div v-if="mode===playMode.sequence">
              <i class="iconfont" @click="changeMode">&#xe625;</i>
              <span class="text">顺序播放</span>
            </div>
            <div v-else-if="mode===playMode.loop">
              <i class="iconfont" @click="changeMode">&#xe614;</i>
              <span class="text">单曲循环</span>
            </div>
            <div v-else>
              <i class="iconfont" @click="changeMode">&#xe670;</i>
              <span class="text">随机播放</span>
            </div>

            <!-- <span class="iconfont clear" @click="handleShowClear">&#xe637;</span> -->
          </h1>
          <div class="ScrollWrapper">
            <Scroll
              name="PlayList"
              ref="listContentRef"
              @onScroll="handleScroll"
              :scrollconfig="scrollconfig"
              :data="data"
            >
              <div class="ListContent">
                <li
                  class="item"
                  v-for="(item,index) in playList"
                  :key="item.id"
                  @click="handleChangeCurrentIndex($event,index)"
                >
                  <i v-if="getCurrentIcon(item)" class="current iconfont icon-play">&#xe695;</i>
                  <i v-else class="current iconfont"></i>
                  <span class="text">{{item.name}} - {{getName(item.ar)}}</span>
                  <!-- <span class="like">
                    <i class="iconfont">&#xe649;</i>
                  </span>-->
                  <span class="delete" @click="handleDeleteSong($event,item)">
                    <i class="iconfont">&#xe637;</i>
                  </span>
                </li>
              </div>
            </Scroll>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Scroll from "@b/Scroll";
import { getName } from "@/utils";
import { playMode } from "@/api/config";
import { findIndex, shuffle } from "@/utils";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "PlayList",
  components: { Scroll },
  data() {
    //这里存放数据
    return {
      showPlayList: false,
      playList: [],
      data: [],
      scrollconfig: {
        bounceTop: false
      },
      playMode: playMode,
      canTouch: true,
      initialed: false,
      startY: 0,
      distance: 0
    };
  },
  //监听属性 类似于data概念
  computed: {
    // _playList() {
    //   return this.$store.state.Player.playList;
    // }
    mode() {
      return this.$store.state.Player.mode;
    }
  },
  //监控data中的数据变化
  //方法集合
  methods: {
    getName(name) {
      return getName(name);
    },
    handleTogglePlayList(e) {
      e.stopPropagation();
      this.$store.commit("Player/changeShowPlayList", false);
    },
    getPlayMode() {},
    handleShowClear() {},
    changeMode(e) {
      e.stopPropagation();
      let newMode = (this.$store.state.Player.mode + 1) % 3;
      // console.log(newMode);
      if (newMode === 0) {
        console.log("顺序模式");
        //顺序模式
        this.$store.commit(
          "Player/changePlayList",
          this.$store.state.Player.sequencePlayList
        );

        let index = findIndex(
          this.$store.state.Player.currentSong,
          this.$store.state.Player.sequencePlayList
        );
        this.$store.commit("Player/changeCurrentIndex", index);
      } else if (newMode === 1) {
        //单曲循环
        console.log("单曲循环");
        this.$store.commit(
          "Player/changePlayList",
          this.$store.state.Player.sequencePlayList
        );
      } else if (newMode === 2) {
        //随机播放
        console.log("随机播放");
        let newList = shuffle(this.$store.state.Player.sequencePlayList);
        let index = findIndex(this.$store.state.Player.currentSong, newList);
        this.$store.commit("Player/changePlayList", newList);
        this.$store.commit("Player/changeCurrentIndex", index);
      }
      this.$store.commit("Player/changePlayMode", newMode);
    },
    handleChangeCurrentIndex(event, index) {
      event.stopPropagation();
      this.$store.commit("Player/changeCurrentIndex", index);
    },
    handleDeleteSong(event, song) {
      event.stopPropagation();
      this.$store.commit("Player/handleDeleteSong", song);
    },
    getCurrentIcon(item) {
      return this.$store.state.Player.currentSong.id === item.id;
    },
    handleScroll(pos) {
      let state = pos.y === 0;
      // console.log(state);
      this.canTouch = state;
      // setCanTouch(state);
    },
    handleTouchStart(e) {
      if (!this.canTouch || this.initialed) return;
      this.$refs.listWrapperRef.style["transition"] = "";
      this.distance = 0;
      this.startY = e.touches[0].pageY;
      this.initialed = true;
    },
    handleTouchMove(e) {
      if (!this.canTouch || !this.initialed) return;

      let distance = e.touches[0].pageY - this.startY;
      if (distance < 0) return;
      this.distance = distance;
      this.$refs.listWrapperRef.style.transform = `translate3d(0, ${distance}px, 0)`;
    },
    handleTouchEnd(e) {
      this.initialed = false;

      if (this.distance >= 150) {
        this.$store.commit("Player/changeShowPlayList", false);
      } else {
        this.$refs.listWrapperRef.style["transition"] = "all 0.3s";
        this.$refs.listWrapperRef.style.transform = `translate3d(0px, 0px, 0px)`;
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {}, //生命周期 - 创建之前
  watch: {
    "$store.state.Player.showPlayList": {
      handler: function(nv) {
        this.showPlayList = nv;
      }
    },
    "$store.state.Player.playList": {
      handler: function(nv) {
        this.playList = nv;
        this.data = [...nv];
      },
      immediate: true
    }
  },
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //   console.log(this.$refs.listWrapperRef);
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后 refs可以取到
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  deactivated() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.PlayListWrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: $backgroundColorShadow;
  .list_wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 1;
    border-radius: 10px 10px 0 0;
    background-color: $highlightBackgroundColor;
    // transform: translate3d(0, 0, 0);
    .ListHeader {
      position: relative;
      padding: 20px 30px 10px 20px;
      .title {
        display: flex;
        align-items: center;
        > div {
          flex: 1;
          .text {
            flex: 1;
            font-size: $fontSizeM;
            color: $fontColorDesc;
          }
        }
        .iconfont {
          margin-right: 10px;
          font-size: $fontSizeLL;
          color: $themeColor;
        }
        .clear {
          @include extendClick();
          font-size: $fontSizeL;
        }
      }
    }
    .list_close {
      text-align: center;
      line-height: 50px;
      background: $backgroundColor;
      font-size: $fontSizeL;
      color: $fontColorDesc;
    }

    .ScrollWrapper {
      height: 400px;
      overflow: hidden;
      .ListContent {
        .item {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 30px 0 20px;
          overflow: hidden;
          .current {
            flex: 0 0 20px;
            width: 20px;
            font-size: $fontSizeS;
            color: $themeColor;
          }
          .text {
            flex: 1;
            @include noWrap();
            //   ${style.noWrap()}
            font-size: $fontSizeM;
            color: $fontColorDescV2;
            .icon-favorite {
              color: $themeColor;
            }
          }
          .like {
            @include extendClick();
            margin-right: 15px;
            font-size: $fontSizeM;
            color: $themeColor;
          }
          .delete {
            @include extendClick();
            font-size: $fontSizeS;
            color: $themeColor;
          }
        }
      }
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(100vh);
  opacity: 0;
}
</style>