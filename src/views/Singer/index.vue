<!--  -->
<template>
  <transition name="slide-fade">
    <div class="Container">
      <Header ref="headerEl" :title="title" :isMarquee="isMarquee" />
      <div v-if="artist">
        <div class="ImgWrapper" ref="imageWrapper" :style="{background:backgroundImg}">
          <div class="filter"></div>
        </div>

        <div class="SongListWrapper" ref="songScrollWrapper">
          <Scroll name="Album" @onScroll="handleScroll" :data="data" ref="songScroll">
            <SongsList :song="hotSongs"></SongsList>
          </Scroll>
        </div>
      </div>

      <Loading v-if="loading" />
    </div>
  </transition>
</template>

<script>
import Header from "@b/Header";
import Scroll from "@b/Scroll";
import Loading from "@b/Loading";
import SongsList from "../SongList";
import { HEADER_HEIGHT, OFFSET } from "@/api/config";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { Scroll, Header, SongsList, Loading },
  data() {
    //这里存放数据
    return {
      data: [],
      artist: null,
      backgroundImg: "",
      title: "返回",
      isMarquee: false,
      loading: false,
      Height: 0,
      id: 0,
      hotSongs: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    SongListWrapperTop() {
      let h = this.$refs.imageWrapper.offsetHeight;
      if (h < 100) {
        h = 282;
      }
      this.$refs.songScrollWrapper.style.top = `${h - OFFSET}px`;
      this.Height = h;
      // 把遮罩先放在下面，以裹住歌曲列表
      //   this.$refs.layer.style.top = `${h - OFFSET}px`;
      this.$refs.songScroll.brefresh();
    },
    handleScroll(pos) {
      const newY = pos.y;
      const imageDOM = this.$refs.imageWrapper;
      const headerDOM = this.$refs.headerEl.$el;
      const minScrollY = -(this.Height - OFFSET) + HEADER_HEIGHT;
      console.log(minScrollY);
      const percent = Math.abs(newY / this.Height);
      if (newY > 0) {
        imageDOM.style["transform"] = `scale(${1 + percent})`;
      } else if (newY >= minScrollY) {
        imageDOM.style.paddingTop = "75%";
        imageDOM.style.height = "auto";
        imageDOM.style.zIndex = -1;
      } else if (newY < minScrollY) {
        headerDOM.style.zIndex = 100;
        imageDOM.style.height = `45px`;
        imageDOM.style.paddingTop = 0;
        imageDOM.style.zIndex = 99;
      }
    },
    getSingerDataDispatch(id) {
      this.$store.dispatch("Artist/getSingerInfo", this.id).then(res => {
        this.artist = res.artist;
        this.hotSongs = res.hotSongs;
        this.data = [this.artist];
        this.loading = this.$store.getters["Artist/loading"];
        this.backgroundImg = `url(${this.artist.picUrl}) 0% 0% / cover`;
        this.$nextTick(function() {
          this.SongListWrapperTop();
        });
      });
    }
  },
  activated() {
    this.id = this.$route.params.id;
    this.getSingerDataDispatch();
  }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100vw);
  opacity: 0;
}
.Container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  //   bottom: ${props => props.play > 0 ? "60px": 0};
  bottom: 0px;
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: #f2f3f4;
  //   transform-origin: right bottom;
  //   &.fly-enter, &.fly-appear {
  //     transform: rotateZ(30deg) translate3d(100%, 0, 0);
  //   }
  //   &.fly-enter-active, &.fly-appear-active {
  //     transition: transform .3s;
  //     transform: rotateZ(0deg) translate3d(0, 0, 0);
  //   }
  //   &.fly-exit {
  //     transform: rotateZ (0deg) translate3d (0, 0, 0);
  //   }
  //   &.fly-exit-active {
  //     transition: transform .3s;
  //     transform: rotateZ (30deg) translate3d (100%, 0, 0);
  //   }
  .BgLayer {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: white;
    border-radius: 10px;
    z-index: 50;
  }
  .ImgWrapper {
    position: relative;
    width: 100%;
    height: auto;
    padding-top: 75%;
    transform-origin: top;
    //   background: url (${props => props.bgUrl});
    z-index: 50;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.3);
    }
  }
  .SongListWrapper {
    position: absolute;
    z-index: 50;
    top: 0px;
    left: 0;
    bottom: 0;
    right: 0;
    > div {
      position: absolute;
      left: 0;
      width: 100%;
      overflow: visible;
    }
  }
}
</style>