<!--  -->
<template>
  <transition name="slide-fade">
    <div :class="['Container',{bottom:bottom}]" v-if="currentAlbum">
      <Header ref="headerEl" :title="title" :isMarquee="isMarquee" />
      <Scroll :scrollconfig="scrollconfig" name="Album" @onScroll="handleScroll" :data="data">
        <div>
          <div class="TopDesc">
            <div
              class="background"
              :style="{background:backgroundImg,backgroundSize:'100% 100%'}"
              ref="TopDesc"
            >
              <div class="filter"></div>
            </div>
            <div class="img_wrapper">
              <div class="decorate"></div>
              <img :src="currentAlbum.coverImgUrl" alt />
              <div class="play_count">
                <i class="iconfont play">&#xe685;</i>
                <span class="count">{{Math.floor(currentAlbum.subscribedCount/1000)/10}} 万</span>
              </div>
            </div>
            <div class="desc_wrapper">
              <div class="title">{{currentAlbum.name}}</div>
              <div class="person">
                <div class="avatar">
                  <img :src="currentAlbum.creator.avatarUrl" alt />
                </div>
                <div class="name">{{currentAlbum.creator.nickname}}</div>
              </div>
            </div>
          </div>
          <div class="Menu">
            <div>
              <i class="iconfont">&#xe660;</i>
              评论
            </div>
            <div>
              <i class="iconfont">&#xe649;</i>
              点赞
            </div>
            <div>
              <i class="iconfont">&#xe6dc;</i>
              收藏
            </div>
            <div>
              <i class="iconfont">&#xe501;</i>
              更多
            </div>
          </div>
          <SongsList :song="artist"></SongsList>
        </div>
      </Scroll>
      <Loading v-if="loading" />
    </div>
  </transition>
</template>

<script>
import Header from "@b/Header";
import Scroll from "@b/Scroll";
import Loading from "@b/Loading";
import SongsList from "@/views/SongList";
import { getCount, getName } from "@/utils";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Album",
  components: { Header, Scroll, Loading, SongsList },

  data() {
    //这里存放数据
    return {
      data: [],
      scrollconfig: {
        bounceTop: false
      },
      currentAlbum: null,
      backgroundImg: "",
      isMarquee: false,
      title: "返回",
      loading: true,
      id: this.$route.params.id,
      artist: [],
      bottom: true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    "$store.state.Player.playList": {
      handler: function(nv) {
        console.log(nv.length);
        nv.length !== 0 ? (this.bottom = true) : (this.bottom = false);
      },
      immediate: true
    }
  },
  //方法集合
  methods: {
    getCount(count) {
      return getCount(count);
    },
    getName(name) {
      return getName(name);
    },
    handleScroll(pos) {
      let minScrollY = -45;
      let percent = Math.abs(pos.y / minScrollY);
      let headerDom = this.$refs.headerEl.$el;
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = "#d44439";
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
        this.title = this.currentAlbum.name;
        this.isMarquee = true;
      } else {
        headerDom.style.backgroundColor = "";
        headerDom.style.opacity = 1;
        this.title = "返回";
        this.isMarquee = false;
      }
    },
    getAlbumDataDispatch() {
      this.$store.dispatch("Album/getAlbumDetailRequest", this.id).then(res => {
        this.currentAlbum = res;
        this.backgroundImg = `url(${this.currentAlbum.coverImgUrl}) no-repeat center`;
        this.loading = this.$store.getters["Album/enterLoading"];
        this.data = [this.currentAlbum];
        this.artist = res.tracks;
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
  beforeCreate() {}, //生命周期 - 创建之前
  created() {},
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {
    this.id = this.$route.params.id;
    this.getAlbumDataDispatch();
    this.title = "返回";
  }, //如果页面有keep-alive缓存功能，这个函数会触发
  deactivated() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.bottom {
  bottom: 60px !important;
}
.Container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: #fff;
  .TopDesc {
    background-size: 100%;
    padding: 5px 20px;
    padding-bottom: 50px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 275px;
    position: relative;
    .background {
      z-index: -1;
      // background: url (${props => props.background}) no-repeat;
      background-position: 0 0;
      background-size: 100% 100%;
      position: absolute;
      width: 100%;
      height: 100%;
      filter: blur(8px);
      .filter {
        position: absolute;
        z-index: 10;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.2);
      }
    }
    .img_wrapper {
      width: 120px;
      height: 120px;
      position: relative;
      .decorate {
        position: absolute;
        top: 0;
        width: 100%;
        height: 35px;
        border-radius: 3px;
        background: linear-gradient(
          hsla(0, 0%, 43%, 0.4),
          hsla(0, 0%, 100%, 0)
        );
      }
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
        width: 120px;
        height: 120px;
        border-radius: 3px;
      }
    }
    .desc_wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 120px;
      padding: 0 10px;
      .title {
        max-height: 70px;
        color: $fontColorLight;
        font-weight: 700;
        line-height: 1.5;
        font-size: $fontSizeL;
      }
      .person {
        display: flex;
        .avatar {
          width: 20px;
          height: 20px;
          margin-right: 5px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .name {
          line-height: 20px;
          font-size: $fontSizeM;
          color: $fontColorDescV2;
        }
      }
    }
  }
  .Menu {
    position: relative;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 30px 20px 30px;
    margin: -100px 0 -10px 0;
    > div {
      display: flex;
      flex-direction: column;
      line-height: 20px;
      text-align: center;
      font-size: $fontSizeS;
      color: $fontColorLight;
      z-index: 1000;
      font-weight: 500;
      .iconfont {
        font-size: 20px;
      }
    }
  }

  .SongList {
    border-radius: 10px;
    opacity: 0.98;
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
}
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
</style>