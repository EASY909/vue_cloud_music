<!--  -->
<template>
  <transition name="slide-fade" v-if="!fullScreen">
    <div class="MiniPlayerContainer" @click="toggleFullScreen(true)">
      <div class="icon">
        <div class="imgWrapper">
          <img
            :class="`play ${playing ? '': 'pause'}`"
            :src="song.al.picUrl"
            width="40"
            height="40"
            alt="img"
          />
        </div>
      </div>
      <div class="text">
        <h2 class="name">{{song.name}}</h2>
        <p class="desc">{{getName(song.ar)}}</p>
      </div>
      <div class="control">
        <ProgressCircle :radius="radius" :percent="percent">
          <i
            v-if="playing"
            @click="e=>clickPlaying(e, false)"
            class="icon-mini iconfont icon-pause"
          >&#xe60e;</i>
          <i v-else @click="e=>clickPlaying(e, true)" class="icon-mini iconfont icon-play">&#xe66e;</i>
        </ProgressCircle>
      </div>
      <div class="control" @click="handleTogglePlayList">
        <i class="iconfont">&#xe691;</i>
      </div>
    </div>
  </transition>
</template>

<script>
import { getName } from "@/utils";
import ProgressCircle from "@b/ProgressCircle";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "miniPlayer",
  components: { ProgressCircle },
  props: {
    song: {
      type: Object,
      default: {}
    },
    currentTime: {
      type: Number,
      default: 0
    },
    percent: {
      type: Number,
      default: 0
    },
    togglePlayList: {
      type: Function,
      default: null
    }
  },
  data() {
    //这里存放数据
    return {
      fullScreen: false,
      radius: 32,
      // percent: 0,
      playing: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    "$store.state.Player.fullScreen": {
      handler: function(nv) {
        this.fullScreen = nv;
      },
      immediate: true
    },
    "$store.state.Player.playing": {
      handler: function(nv) {
        this.playing = nv;
      },
      immediate: true
    },
    percent(nv) {
      // console.log(nv);
    },
    currentTime(nv) {
      // console.log(nv);
    }
  },
  //方法集合
  methods: {
    getName(name) {
      return getName(name);
    },
    toggleFullScreen(value) {
      this.$store.commit("Player/changeFullScreen", value);
    },
    clickPlaying(e, state) {
      e.stopPropagation();
      this.$store.commit("Player/changePlayingState", state);
    },
    handleTogglePlayList(e) {
      e.stopPropagation();
       this.$store.commit("Player/changeShowPlayList", true);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    console.log("迷你组件");
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
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.MiniPlayerContainer {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 60px;
  background: $highlightBackgroundColor;
  &.mini-enter {
    transform: translate3d(0, 100%, 0);
  }
  &.mini-enter-active {
    transform: translate3d(0, 0, 0);
    transition: all 0.4s;
  }
  &.mini-exit-active {
    transform: translate3d(0, 100%, 0);
    transition: all 0.4s;
  }
  .icon {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .imgWrapper {
      width: 100%;
      height: 100%;
      img {
        border-radius: 50%;
        &.play {
          animation: rotate 10s linear infinite;
          &.pause {
            animation-play-state: paused;
          }
        }
      }
    }
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .name {
      margin-bottom: 2px;
      font-size: $fontSizeM;
      color: $fontColorDesc;
      @include noWrap;
    }
    .desc {
      font-size: $fontSizeS;
      color: $fontColorDescV2;
      @include noWrap;
    }
  }
  .control {
    flex: 0 0 30px;
    padding: 0 10px;
    .iconfont,
    .icon-playlist {
      font-size: 30px;
      color: $themeColor;
    }
    .icon-mini {
      font-size: 16px;
      position: absolute;
      left: 8px;
      top: 8px;
      &.icon-play {
        left: 9px;
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
  transform: translateY(60px);
  opacity: 0;
}
</style>