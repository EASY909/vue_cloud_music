<template>
  <div>
    <div class="top">
      <span class="iconfont">&#xe672;</span>
      <span class="iconfont">&#xe504;</span>
      <span class="iconfont" @click="enterSearch">&#xe6e1;</span>
    </div>
    <div class="tab">
      <div class="tabItem">
        <router-link to="/recommend">
          <span>推荐</span>
        </router-link>
      </div>
      <div class="tabItem">
        <router-link to="/singers">
          <span>歌手</span>
        </router-link>
      </div>
      <div class="tabItem">
        <router-link to="/rank">
          <span>排行榜</span>
        </router-link>
      </div>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <Player></Player>
  </div>
</template>

<script>
// @ is an alias to /src
import Player from "@/views/Player";
export default {
  name: "home",
  components: {
    Player
  },
  methods: {
    enterSearch(){
      this.$router.push("/search")
    }
  }
};
</script>
<style lang="scss" scoped>
// @import "../styles/config.scss";
.top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  background: $themeColor;
  & > span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }
}
.tab {
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: $themeColor;
  a {
    flex: 1;
    padding: 2px 0;
    font-size: 14px;
    color: #e4e4e4;
    &.router-link-active {
      span {
        padding: 3px 0;
        font-weight: 700;
        color: #f1f1f1;
        border-bottom: 2px solid #f1f1f1;
      }
    }
  }
}
.tabItem {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>

