<!--  -->
<template>
  <div class="SearchBoxWrapper">
    <i class="iconfont icon-back" @click="goBack">&#xe503;</i>
    <input ref="queryRef" class="box" v-model="query" placeholder="搜索歌曲、歌手、专辑" />
    <i class="iconfont icon-delete" @click="clearQuery" v-if="query!==''?true:false">&#xe504;</i>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "SearchBox",
  props: {
    newQuery: {
      type: String,
      default: ""
    }
  },
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    query: {
      get: function() {
        return this.newQuery;
      },
      // setter
      set: function(newValue) {
        this.$emit("update:newQuery", newValue);
      }
    }
  },
  //监控data中的数据变化
  //方法集合
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    clearQuery() {
      this.query = "";
      this.$refs.queryRef.focus();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {}, //生命周期 - 创建之前
  watch: {
    // query(nv) {
    //   this.$emit("update:newQuery", nv);
    // }
  },
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$refs.queryRef.focus();
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
.SearchBoxWrapper {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  padding-right: 20px;
  height: 40px;
  background: $themeColor;
  .icon-back {
    font-size: 24px;
    color: $fontColorLight;
  }
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: $themeColor;
    color: #fff;
    font-size: $fontSizeM;
    outline: none;
    border: none;
    border-bottom: 1px solid $borderColor;
    &::placeholder {
      color: $fontColorLight;
    }
  }
  .icon-delete {
    font-size: 16px;
    color: $backgroundColor;
  }
}
</style>