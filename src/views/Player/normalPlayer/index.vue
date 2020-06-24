<!--  -->
<template>
  <transition name="slide-fade" v-if="fullScreen">
    <div class="NormalPlayerContainer" v-if="song!==null">
      <div class="background">
        <img :src="song.al.picUrl + '?param=300x300'" width="100%" height="100%" alt="歌曲图片" />
      </div>
      <div class="background layer"></div>
      <div class="Top">
        <div class="back" @click="toggleFullScreen(false)">
          <i class="iconfont icon-back">&#xe621;</i>
        </div>
        <h1 class="title">{{song.name}}</h1>
        <h1 class="subtitle">{{getName(song.ar)}}</h1>
      </div>

      <div class="Middle" @click="toggleCurrentState">
        <div class="CDWrapper" v-show="currentState !=='lyric'">
          <div class="cd">
            <img
              :class="`image play ${playing ? '': 'pause'}`"
              :src="song.al.picUrl + '?param=400x400'"
              alt
            />
          </div>
        </div>

        <div class="LyricContainer" v-if="currentState ==='lyric'">
          <Scroll name="Lyric" :data="data" ref="lyricScrollRef">
            <div class="LyricWrapper" v-if="currentLyric">
              <template v-for="(item,index) in currentLyric.lines">
                <p
                  ref="lyricLineRefs"
                  :class="currentLineNum===index?'current':''"
                  :key="index"
                >{{item.txt}}</p>
                <!-- <p v-else class="text" :key="index">{{item.txt}}</p> -->
              </template>
            </div>
            <div class="LyricWrapper" v-else>
              <p class="text pure">纯音乐，请欣赏。</p>
            </div>
          </Scroll>
        </div>
      </div>

      <div class="Bottom">
        <div class="ProgressWrapper">
          <span class="time time-l">{{formatPlayTime(currentTime)}}</span>
          <div class="progress-bar-wrapper">
            <ProgressBar :percent="percent" :percentChange="onProgressChange"></ProgressBar>
          </div>
          <div class="time time-r">{{formatPlayTime(duration)}}</div>
        </div>

        <div class="Operators">
          <div class="icon i-left" @click="onChangeMode">
            <i v-if="mode===playmode.sequence" class="iconfont">&#xe509;</i>
            <i v-else-if="mode===playmode.loop" class="iconfont">&#xe506;</i>
            <i v-else class="iconfont">&#xe619;</i>
          </div>
          <div class="icon i-left" @click="handlePrev">
            <i class="iconfont">&#xe663;</i>
          </div>
          <div class="icon i-center">
            <i
              v-if="playing"
              @click="e=>clickPlaying(e, false)"
              class="icon-mini iconfont icon-pause"
            >&#xe665;</i>
            <i
              v-else
              @click="e=>clickPlaying(e, true)"
              class="icon-mini iconfont icon-play"
            >&#xe666;</i>
          </div>
          <div class="icon i-right" @click="handleNext">
            <i class="iconfont">&#xe617;</i>
          </div>
          <div class="icon i-right" @click="handleTogglePlayList">
            <i class="iconfont">&#xe664;</i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { getName, formatPlayTime } from "@/utils";
import { playMode } from "@/api/config";
import ProgressBar from "@b/ProgressBar";
import Scroll from "@b/Scroll";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { ProgressBar, Scroll },
  props: {
    song: {
      type: Object,
      default: {}
    },
    duration: {
      type: Number,
      default: 0
    },
    currentTime: {
      type: Number,
      default: 0
    },
    percent: {
      type: Number,
      default: 0
    },
    ProgressChange: {
      type: Function,
      default: null
    },
    handlePrev: {
      type: Function,
      default: null
    },
    handleNext: {
      type: Function,
      default: null
    },
    changeMode: {
      type: Function,
      default: null
    },
    togglePlayList: {
      type: Function,
      default: null
    },
    currentLyric: {
      type: Object,
      default: null
    },
    currentLineNum: {
      type: Number,
      default: 0
    },
    currentPlayingLyric: {
      type: String,
      default: ""
    }
    // fullScreen:{
    //     type:Boolean,
    //     default:false
    // }
  },
  data() {
    //这里存放数据
    return {
      mysong: null,
      fullScreen: false,
      playing: false,
      mycurrentTime: 0,
      playmode: playMode,
      currentState: "",
      data: []
    };
  },
  //监听属性 类似于data概念
  computed: {
    mode() {
      return this.$store.state.Player.mode;
    }
  },
  //监控data中的数据变化
  //方法集合
  methods: {
    getName(song) {
      return getName(song);
    },
    toggleFullScreen(value) {
      this.$store.commit("Player/changeFullScreen", value);
    },
    onProgressChange(curPercent) {
      this.ProgressChange(curPercent);
    },
    clickPlaying(e, state) {
      console.log("全面屏暂停");
      e.stopPropagation();
      this.$store.commit("Player/changePlayingState", state);

      if (this.currentLyric) {
        this.currentLyric.togglePlay(this.currentTime * 1000);
      }
    },
    formatPlayTime(time) {
      return formatPlayTime(time);
    },
    onChangeMode() {
      this.changeMode();
    },
    handleTogglePlayList(e) {
      e.stopPropagation();
      this.$store.commit("Player/changeShowPlayList", true);
    },
    toggleCurrentState() {
      let nextState = "";
      if (this.currentState !== "lyric") {
        nextState = "lyric";
      } else {
        nextState = "";
      }
      this.currentState = nextState;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {}, //生命周期 - 创建之前
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
    "$store.state.Player.mode": function(nv) {
      console.log(nv);
    },
    currentLyric: {
      handler: function(nv) {
        this.data = [...nv.lines];
      }
    },
    currentLineNum(nv) {
      if (!this.$refs.lyricScrollRef) return;
      let bScroll = this.$refs.lyricScrollRef;

      if (nv > 5) {
        let lineEl = this.$refs.lyricLineRefs[nv - 5];
        console.log(lineEl);
        bScroll.scroll.scrollToElement(lineEl, 1000);
      } else {
        bScroll.scroll.scrollTo(0, 0, 1000);
      }
    },
    currentPlayingLyric(nv) {
      // console.log(nv);
    }
  },
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.NormalPlayerContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
  background: $backgroundColor;
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);
    &.layer {
      background: $fontColorDesc;
      opacity: 0.3;
      filter: none;
    }
  }
  .Top {
    position: relative;
    margin-bottom: 25px;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 50;
      .iconfont {
        display: block;
        padding: 9px;
        font-size: 24px;
        color: $fontColorDesc;
        font-weight: bold;
        transform: rotate (90deg);
      }
    }
    .title {
      width: 70%;
      margin: 0 auto;
      line-height: 40px;
      text-align: center;
      font-size: $fontSizeL;
      color: $fontColorDesc;
      @include noWrap;
    }
    .subtitle {
      line-height: 20px;
      text-align: center;
      font-size: $fontSizeM;
      color: $fontColorDescV2;
      @include noWrap;
    }
  }

  .Middle {
    position: fixed;
    width: 100%;
    top: 80px;
    bottom: 170px;
    white-space: nowrap;
    font-size: 0;
    overflow: hidden;
    .CDWrapper {
      position: absolute;
      margin: auto;
      top: 10%;
      left: 0;
      right: 0;
      width: 80%;
      box-sizing: border-box;
      height: 80vw;
      .cd {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        .image {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border-radius: 50%;
          border: 10px solid rgba(255, 255, 255, 0.1);
        }
        .play {
          animation: rotate 20s linear infinite;
          &.pause {
            animation-play-state: paused;
          }
        }
      }
      .playing_lyric {
        margin-top: 20px;
        font-size: 14px;
        line-height: 20px;
        white-space: normal;
        text-align: center;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
  .Bottom {
    position: absolute;
    bottom: 50px;
    width: 100%;
    .Operators {
      display: flex;
      align-items: center;
      .icon {
        font-weight: 300;
        flex: 1;
        color: $fontColorDesc;
        &.disable {
          color: $backgroundColorShadow;
        }
        i {
          font-weight: 300;
          font-size: 30px;
        }
      }
      .i-left {
        text-align: right;
      }
      .i-center {
        padding: 0 20px;
        text-align: center;
        i {
          font-size: 40px;
        }
      }
      .i-right {
        text-align: left;
      }
      .icon-favorite {
        color: $themeColor;
      }
    }

    .ProgressWrapper {
      display: flex;
      align-items: center;
      width: 80%;
      margin: 0px auto;
      padding: 10px 0;
      .time {
        color: $fontColorDesc;
        font-size: $fontSizeS;
        flex: 0 0 30px;
        line-height: 30px;
        width: 35px;
        &.time-l {
          text-align: left;
        }
        &.time-r {
          text-align: right;
        }
      }
      .progress-bar-wrapper {
        flex: 1;
      }
    }
  }
}
.LyricContainer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /* 遮罩 会有模糊效果，看个人喜欢*/
  /* mask-image: -webkit-gradient(linear,left top,left bottom,color-stop(0,hsla(0,0%,100%,0)),color-stop(10%,hsla(0,0%,100%,.6)),color-stop(25%,#fff),color-stop(75%,#fff),color-stop(85%,hsla(0,0%,100%,.6)),to(hsla(0,0%,100%,0)));
  mask-image: linear-gradient(linear,left top,left bottom,color-stop(0,hsla(0,0%,100%,0)),color-stop(10%,hsla(0,0%,100%,.6)),color-stop(25%,#fff),color-stop(75%,#fff),color-stop(85%,hsla(0,0%,100%,.6)),to(hsla(0,0%,100%,0))); */
}
.LyricWrapper {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  p {
    line-height: 32px;
    color: rgba(255, 255, 255, 0.5);
    white-space: normal;
    font-size: $fontSizeL;
    &.current {
      color: #fff;
    }
    &.pure {
      position: relative;
      top: 30vh;
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
  transform: translateX(100vw);
  opacity: 0;
}
</style>