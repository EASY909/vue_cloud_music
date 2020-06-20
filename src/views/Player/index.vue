<!--  -->
<template>
  <div>
    <MiniPlayer :song="currentSong" :currentTime="currentTime" :percent="percent"></MiniPlayer>
    <NormalPlayer
      :song="currentSong"
      :duration="duration"
      :currentTime="currentTime"
      :fullScreen="fullScreen"
      :percent="percent"
      :ProgressChange="ProgressChange"
      :handlePrev="handlePrev"
      :handleNext="handleNext"
      :changeMode="changeMode"
    ></NormalPlayer>

    <audio ref="audioRef" @timeupdate="updateTime" @ended="{handleEnd}"></audio>
  </div>
</template>

<script>
import MiniPlayer from "./miniPlayer";
import NormalPlayer from "./normalPlayer";
import { getSongUrl, findIndex, shuffle } from "@/utils";
import {playMode} from "@/api/config"
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
      playList: [],
      fullScreen: this.$store.state.Player.fullScreen,
      currentTime: 0,
      duration: 0,
      preSong: {}
    };
  },
  //监听属性 类似于data概念
  computed: {
    percent() {
      return isNaN(this.currentTime / this.duration)
        ? 0
        : this.currentTime / this.duration;
    }
  },
  //监控data中的数据变化
  watch: {
    "$store.state.Player.playing": function(nv) {
      nv ? this.$refs.audioRef.play() : this.$refs.audioRef.pause();
    }
  },
  //方法集合
  methods: {
    init() {
      if (
        !this.$store.state.Player.playList.length ||
        !this.$store.state.Player.currentIndex ||
        !this.$store.state.Player.playList[
          this.$store.state.Player.currentIndex
        ] ||
        this.$store.state.Player.playList[this.$store.state.Player.currentIndex]
          .id === this.preSong.id
      )
        return;
      let current = this.playList[this.$store.state.Player.currentIndex];
      this.$store.commit("Player/changeCurrentSong", current); //赋值currentSong
      this.preSong = current;

      this.$refs.audioRef.src = getSongUrl(current.id);
      setTimeout(() => {
        this.$refs.audioRef.play();
      });

      this.$store.commit("Player/changePlayingState", true); //播放状态
      this.currentTime = 0;
      this.duration = (current.dt / 1000) | 0;
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
    },
    handleLoop() {
      this.$refs.audioRef.currentTime = 0;
      this.$store.commit("Player/changePlayingState", true);
      this.$refs.audioRef.play();
    },
    handlePrev() {
      //播放列表只有一首歌时单曲循环
      if (this.$store.state.Player.playList.length === 1) {
        this.handleLoop();
        return;
      }
      let index = this.$store.state.Player.currentIndex - 1;
      if (index < 0) index = this.$store.state.Player.playList.length - 1;
      if (!this.$store.state.Player.playing)
        this.$store.commit("Player/changePlayingState", true);

      this.$store.commit("Player/changeCurrentIndex", index);
    },
    handleNext() {
      //播放列表只有一首歌时单曲循环

      if (this.$store.state.Player.playList.length === 1) {
        this.handleLoop();
        return;
      }
      let index = this.$store.state.Player.currentIndex + 1;
      if (index === this.$store.state.Player.playList.length) index = 0;
      if (!this.$store.state.Player.playing)
        this.$store.commit("Player/changePlayingState", true);

      this.$store.commit("Player/changeCurrentIndex", index);
    },
    changeMode() {
      console.log(111);
      let newMode = (this.$store.state.Player.mode + 1) % 3;
      if (newMode === 0) {
        //顺序模式
        this.$store.commit(
          "Player/changePlayList",
          this.$store.state.Player.sequencePlayList
        );

        let index = findIndex(
          this.$store.state.Player.currentSong,
          this.$store.state.Player.sequencePlayList.sequencePlayList
        );
        this.$store.commit("Player/changeCurrentIndex", index);
      } else if (newMode === 1) {
        //单曲循环
        this.$store.commit(
          "Player/changePlayList",
          this.$store.state.Player.sequencePlayList
        );
      } else if (newMode === 2) {
        //随机播放
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
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init();
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