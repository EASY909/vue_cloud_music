<!--  -->
<template>
  <transition name="slide-fade">
    <div class="Container">
      <SearchBox :newQuery.sync="query"></SearchBox>
      <div class="ShortcutWrapper" v-if="!query">
        <div>
          <div class="HotKey">
            <h1 class="title">热门搜索</h1>
            <!-- {renderHotKey ()} -->
            <ul v-if="hotList!==[]">
              <li v-for="item in hotList" class="item" :key="item.first" @click="query=item.first">
                <span>{{item.first}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="ShortcutWrapper" v-if="query">
        <Scroll :data="data" name="searchResult">
          <div>
            <div class="List" v-if="suggestList.artists">
              <h1 class="title">相关歌手</h1>
              <div
                class="ListItem"
                v-for="(item,index) in suggestList.artists"
                :key="item.accountId+''+index"
                @click="goSinger(item.id)"
              >
                <div class="img_wrapper">
                  <div v-lazy-container="{ selector: 'img', loading: imgUrl }">
                    <img
                      :data-src="item.picUrl+ `?param=300x300`"
                      width="100%"
                      height="100%"
                      alt="music"
                    />
                  </div>
                </div>
                <span class="name">歌手: {{item.name}}</span>
              </div>
            </div>

            <div class="List" v-if="suggestList.playlists">
              <h1 class="title">相关歌单</h1>
              <div
                class="ListItem"
                v-for="(item,index) in suggestList.playlists"
                :key="item.accountId+''+index"
                @click="goAlbum(item.id)"
              >
                <div class="img_wrapper">
                  <div v-lazy-container="{ selector: 'img', loading: imgUrl }">
                    <img
                      :data-src="item.coverImgUrl+ `?param=300x300`"
                      width="100%"
                      height="100%"
                      alt="music"
                    />
                  </div>
                </div>
                <span class="name">歌单: {{item.name}}</span>
              </div>
            </div>

            <div class="SongItem" v-if="songsList" style="paddingLeft:20px">
              <li v-for="item in songsList" :key="item.id" @click="selectItem($event,item.id)">
                <div class="info">
                  <span>{{item.name}}</span>
                  <span>{{getName(item.artists)}} - {{item.album.name}}</span>
                </div>
              </li>
            </div>
          </div>
        </Scroll>
      </div>

      <Loading v-if="loading"></Loading>
    </div>
  </transition>
</template>

<script>
import SearchBox from "@b/SearchBox";
import Scroll from "@b/Scroll";
import Loading from "@b/Loading";
import { debounce, getName } from "@/utils";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Search",
  components: { SearchBox, Scroll, Loading },
  data() {
    //这里存放数据
    return {
      query: "",
      data: [],
      hotList: [],
      imgUrl: require("@/assets/music.png")
      //   loading:true
    };
  },
  //监听属性 类似于data概念
  computed: {
    loading() {
      return this.$store.state.Search.enterLoading;
    },
    suggestList() {
      return this.$store.state.Search.suggestList;
    },
    songsList() {
      return this.$store.state.Search.songsList;
    }
  },
  //监控data中的数据变化
  //方法集合
  methods: {
    getName(name) {
      return getName(name);
    },
    handleQuery() {
      if (!this.query) return;
      this.$store.commit("Search/changeEnterLoading", true);
      this.$store.dispatch("Search/getSuggestList", this.query).then(res => {
        this.data = [this.suggestList, this.songsList];
      });
      this.$store.dispatch("Search/getSongList", this.query).then(res => {
        this.data = [this.suggestList, this.songsList];
      });
    },
    handleQueryDebounce: debounce(function() {
      this.handleQuery();
    }, 300),
    getHotList() {
      this.$store.dispatch("Search/getHotKeyWords").then(res => {
        this.hotList = res;
      });
    },
    goSinger(id) {
      this.$router.push(`/singers/${id}`);
    },
    goAlbum(id) {
      this.$router.push(`/recommend/${id}`);
    },
    selectItem(e, id) {
      this.$store.dispatch("Player/getSongDetail", id);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {}, //生命周期 - 创建之前
  watch: {
    query(nv) {
      //   console.log(nv);
      console.log(nv.length);
      if (nv.trim() === "") return;
      this.handleQueryDebounce();
    }
  },
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getHotList();
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
.Container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;
  .ShortcutWrapper {
    position: absolute;
    top: 40px;
    bottom: 0;
    width: 100%;
    .HotKey {
      margin: 0 20px 20px 20px;
      .title {
        padding-top: 35px;
        margin-bottom: 20px;
        font-size: $fontSizeM;
        color: $fontColorDescV2;
      }
      .item {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: $highlightBackgroundColor;
        font-size: $fontSizeM;
        color: $fontColorDesc;
      }
    }

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

    .SongItem {
      > li {
        display: flex;
        height: 60px;
        align-items: center;
        .index {
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