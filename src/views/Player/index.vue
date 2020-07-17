<!--  -->
<template>
  <div>
    <MiniPlayer
      v-if="!isEmptyObject(_currentSong)"
      :song="_currentSong"
      :currentTime="currentTime"
      :percent="percent"
      :togglePlayList="togglePlayListDispatch"
    ></MiniPlayer>
    <NormalPlayer
      v-if="!isEmptyObject(_currentSong)"
      :song="_currentSong"
      :duration="duration"
      :currentTime="currentTime"
      :fullScreen="fullScreen"
      :percent="percent"
      :ProgressChange="ProgressChange"
      :handlePrev="handlePrev"
      :handleNext="handleNext"
      :changeMode="changeMode"
      :togglePlayList="togglePlayListDispatch"
      :currentLyric="currentLyric"
      :currentPlayingLyric="currentPlayingLyric"
      :currentLineNum="currentLineNum"
    ></NormalPlayer>

    <audio ref="audioRef" @timeupdate="updateTime" @ended="handleEnd" @error="handleError"></audio>

    <PlayList></PlayList>
  </div>
</template>

<script>
import MiniPlayer from "./miniPlayer";
import NormalPlayer from "./normalPlayer";
import PlayList from "./PlayList";
import { getSongUrl, findIndex, shuffle } from "@/utils";
import { playMode } from "@/api/config";
import Lyric from "@/utils/lyric-parser";
import { getLyricRequest } from "@/api/cloudapi";
// import {check} from "@/api/cloudapi"
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Player",
  components: { MiniPlayer, NormalPlayer, PlayList },
  data() {
    //这里存放数据
    return {
      playList: [],
      fullScreen: this.$store.state.Player.fullScreen,
      currentTime: 0,
      duration: 0,
      preSong: {},
      songReady: true, // 标志位为 false
      currentPlayingLyric: "",
      currentLineNum: 0,
      currentLyric: null,
    };
  },
  //监听属性 类似于data概念
  computed: {
    percent() {
      return isNaN(this.currentTime / this.duration)
        ? 0
        : this.currentTime / this.duration;
    },
    goPlay() {
      return {
        playList: this.$store.state.Player.playList,
        currentIndex: this.$store.state.Player.currentIndex
      };
    },
    _playList() {
      return this.$store.state.Player.playList;
    },
    _currentIndex() {
      return this.$store.state.Player.currentIndex;
    },
    _currentSong() {
      return this.$store.state.Player.currentSong;
    },
    _sequencePlayList() {
      return this.$store.state.Player.sequencePlayList;
    },
    _mode() {
      return this.$store.state.Player.mode;
    },
    _showPlayList() {
      return this.$store.state.Player.showPlayList;
    }
  },
  //监控data中的数据变化
  watch: {
    "$store.state.Player.playing": function(nv) {
      nv ? this.$refs.audioRef.play() : this.$refs.audioRef.pause();
    },
    goPlay: {
      handler: function(nv, ov) {
        // console.log(nv);
        this.init();
      },
      deep: true
    },
    "$store.state.Player.fullScreen": function(nv) {
      if (!nv) return;
      if (this.currentLyric && this.currentLyric.lines.length) {
        this.handleLyric({
          lineNum: this.currentLineNum,
          txt: this.currentLyric.lines[this.currentLineNum].txt
        });
      }
    }
  },
  //方法集合
  methods: {
    isEmptyObject(obj) {
      return !obj || Object.keys(obj).length === 0;
    },
    init() {
      console.log("开始播放");
      if (
        !this._playList.length ||
        this._currentIndex === -1 ||
        !this._playList[this._currentIndex] ||
        this._playList[this._currentIndex].id === this.preSong.id ||
        !this.songReady
      )
        return;
      let current = this._playList[this._currentIndex];
      this.$store.commit("Player/changeCurrentSong", current); //赋值currentSong
      this.preSong = current;
      this.$refs.audioRef.src = getSongUrl(current.id);
      this.songReady = false;
      // console.log(getSongUrl(current.id));
      setTimeout(() => {
        this.$refs.audioRef.play();
        this.songReady = true;
      });

      this.$store.commit("Player/changePlayingState", true); //播放状态
      // this.$store.commit("Player/changePlayMode", 0); //播放顺序改为顺序播放
      this.currentTime = 0;
      // console.log(current.dt);
      this.duration = (current.dt / 1000) | 0;

      this.getLyric(current.id);
      this.currentTime = 0;
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
      // console.log(this.currentTime);
    },
    ProgressChange(curPercent) {
      const newTime = curPercent * this.duration;
      this.currentTime = newTime;

      this.$refs.audioRef.currentTime = newTime;
      if (!this.$store.state.Player.playing) {
        this.$store.commit("Player/changePlayingState", true);
      }

      if (this.currentLyric) {
        this.currentLyric.seek(newTime * 1000);
      }
    },
    handleLoop() {
      this.$refs.audioRef.currentTime = 0;
      this.$store.commit("Player/changePlayingState", true);
      this.$refs.audioRef.play();
    },
    handlePrev() {
      //播放列表只有一首歌时单曲循环
      if (this._playList.length === 1) {
        this.handleLoop();
        return;
      }
      let index = this._currentIndex - 1;
      if (index < 0) index = this._playList.length - 1;
      if (!this.$store.state.Player.playing)
        this.$store.commit("Player/changePlayingState", true);

      this.$store.commit("Player/changeCurrentIndex", index);
    },
    handleNext() {
      //播放列表只有一首歌时单曲循环

      if (this._playList.length === 1) {
        this.handleLoop();
        return;
      }
      let index = this._currentIndex + 1;
      if (index === this._playList.length) index = 0;
      if (!this.$store.state.Player.playing)
        this.$store.commit("Player/changePlayingState", true);

      this.$store.commit("Player/changeCurrentIndex", index);
    },
    changeMode() {
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
    handleEnd() {
      if (this.$store.state.Player.mode === playMode.loop) {
        this.handleLoop();
      } else {
        this.handleNext();
      }
    },
    handleError() {
      alert("播放出错");
      this.handleNext();
    },
    togglePlayListDispatch() {
      console.log(111);
    },
    handleLyric({ lineNum, txt }) {
      if (!this.currentLyric) return;
      this.currentLineNum = lineNum;
      this.currentPlayingLyric = txt;
    },
    getLyric(id) {
      let lyric = "";
      if (this.currentLyric) {
        this.currentLyric.stop();
      }
      // 避免 songReady 恒为 false 的情况
      getLyricRequest(id)
        .then(data => {
          lyric = data.lrc.lyric;
          console.log(lyric);
          if (!lyric) {
            this.currentLyric.current = null;
            return;
          }
          this.currentLyric = new Lyric(lyric, this.handleLyric);
          this.currentLyric.play();
          this.currentLineNum = 0;
          this.currentLyric.seek(0);
        })
        .catch(() => {
          this.songReady = true;
          this.$refs.audioRef.play();
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.init();
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
</style>