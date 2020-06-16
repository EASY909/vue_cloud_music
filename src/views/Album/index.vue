<!--  -->
<template>
  <transition name="slide-fade">
    <div class="Container">
      <Header title="返回" />
      <Scroll :scrollconfig="scrollconfig" name="Album" :data="data">
        <div>
          <div class="TopDesc">
            <div class="background" :style="{background:backgroundImg}" ref="TopDesc">
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

          <div class="SongList">
            <div class="first_line">
              <div class="play_all">
                <i class="iconfont">&#xe6e3;</i>
                <span>
                  播放全部
                  <span class="sum">(共 {{currentAlbum.tracks.length}} 首)</span>
                </span>
              </div>
              <div class="add_list">
                <i class="iconfont">&#xe62d;</i>
                <span>收藏 ({{getCount(currentAlbum.subscribedCount)}})</span>
              </div>
            </div>

            <ul class="SongItem">
              <li :key="index" v-for="(item,index) in currentAlbum.tracks">
                <span class="index">{{index + 1}}</span>
                <div class="info">
                  <span>{{item.name}}</span>
                  <span>{{ getName(item.ar)}} - {{item.al.name}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Scroll>
    </div>
  </transition>
</template>

<script>
import Header from "@b/Header";
import Scroll from "@b/Scroll";
import { getCount, getName } from "@/utils";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Album",
  components: { Header, Scroll },

  data() {
    //这里存放数据
    return {
      data: [],
      scrollconfig: {
        bounceTop: false
      },
      currentAlbum: {
        creator: {
          avatarUrl:
            "http://p1.music.126.net/O9zV6jeawR43pfiK2JaVSw==/109951164232128905.jpg",
          nickname: "浪里推舟"
        },
        coverImgUrl:
          "http://p2.music.126.net/ecpXnH13-0QWpWQmqlR0gw==/109951164354856816.jpg",
        subscribedCount: 2010711,
        name: "听完就睡，耳机是天黑以后柔软的梦境",
        tracks: [
          {
            name: "我真的受伤了",
            ar: [{ name: "张学友" }, { name: "周华健" }],
            al: {
              name: "学友 热"
            }
          },
          {
            name: "我真的受伤了",
            ar: [{ name: "张学友" }, { name: "周华健" }],
            al: {
              name: "学友 热"
            }
          },
          {
            name: "我真的受伤了",
            ar: [{ name: "张学友" }, { name: "周华健" }],
            al: {
              name: "学友 热"
            }
          },
          {
            name: "我真的受伤了",
            ar: [{ name: "张学友" }, { name: "周华健" }],
            al: {
              name: "学友 热"
            }
          },
          {
            name: "我真的受伤了",
            ar: [{ name: "张学友" }, { name: "周华健" }],
            al: {
              name: "学友 热"
            }
          },
          {
            name: "我真的受伤了",
            ar: [{ name: "张学友" }, { name: "周华健" }],
            al: {
              name: "学友 热"
            }
          },
          {
            name: "我真的受伤了",
            ar: [{ name: "张学友" }, { name: "周华健" }],
            al: {
              name: "学友 热"
            }
          },
          {
            name: "我真的受伤了",
            ar: [{ name: "张学友" }, { name: "周华健" }],
            al: {
              name: "学友 热"
            }
          },
          {
            name: "我真的受伤了",
            ar: [{ name: "张学友" }, { name: "周华健" }],
            al: {
              name: "学友 热"
            }
          },
          {
            name: "我真的受伤了",
            ar: [{ name: "张学友" }, { name: "周华健" }],
            al: {
              name: "学友 热"
            }
          }
        ]
      },
      backgroundImg: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getCount(count) {
      return getCount(count);
    },
    getName(name) {
      return getName(name);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(this.$route.params);
    this.backgroundImg = `url(${this.currentAlbum.coverImgUrl}) no-repeat`;
    console.log(this.backgroundImg);
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
      filter: blur (20px);
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
    margin: -100px 0 0 0;
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
    // ${props => props.showBackground ? `background: ${style ["highlight-background-color"]}`: ""}
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