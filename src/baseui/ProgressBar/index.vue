<!--  -->
<template>
  <div class="ProgressBarWrapper">
    <div class="bar-inner" ref="progressBar" @click="progressClick">
      <div class="progress" ref="progress"></div>
      <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart="progressTouchStart"
        @touchmove="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "ProgressBar",
  props: {
    percent: {
      type: Number,
      default: 0
    },
    percentChange: {
      type: Function,
      default: null
    }
  },
  components: {},
  data() {
    //这里存放数据
    return {
      touch: {},
      progressBtnWidth: 10
    };
  },
  //监听属性 类似于data概念
  computed: {
    _percent() {
      return this.percent;
    }
  },
  //监控data中的数据变化
  //方法集合
  methods: {
    offset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`;
      this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
    },
    progressTouchStart(e) {
      const startTouch = {};
      startTouch.initiated = true; //initial 为 true 表示滑动动作开始了
      startTouch.startX = e.touches[0].pageX; // 滑动开始时横向坐标
      startTouch.left = this.$refs.progress.clientWidth; // 当前 progress 长度
      this.touch = startTouch;
      //   console.log( this.touch );
      //   setTouch(startTouch);
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) return;
      // 滑动距离
      const deltaX = e.touches[0].pageX - this.touch.startX;
      const barWidth =
        this.$refs.progressBar.clientWidth - this.progressBtnWidth;
      // const offsetWidth = Math.max(0, this.touch.left + deltaX);
      const offsetWidth = Math.min(
        Math.max(0, this.touch.left + deltaX),
        barWidth
      );
      this.offset(offsetWidth);
    },
    progressTouchEnd(e) {
      const endTouch = JSON.parse(JSON.stringify(this.touch));
      endTouch.initiated = false;
      this.touch = endTouch;

      this.changePercent();
    },
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      this.offset(offsetWidth);
      this.changePercent();
    },

    changePercent() {
      const barWidth =
        this.$refs.progressBar.clientWidth - this.progressBtnWidth;
      const curPercent = this.$refs.progress.clientWidth / barWidth; // 新的进度计算
      this.percentChange(curPercent); // 把新的进度传给回调函数并执行
    },
    computedBar() {}
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {}, //生命周期 - 创建之前
  watch: {
    percent: {
      handler: function(nv) {
        if (nv >= 0 && nv <= 1 && !this.touch.initiated) {
          const barWidth =
            this.$refs.progressBar.clientWidth - this.progressBtnWidth;
          const offsetWidth = nv * barWidth;
          this.$refs.progress.style.width = `${offsetWidth}px`;
          this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
        }
      }
    },
  },
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(function() {
      if (this._percent >= 0 && this._percent <= 1 && !this.touch.initiated) {
        const barWidth =
          this.$refs.progressBar.clientWidth - this.progressBtnWidth;
        const offsetWidth = this._percent * barWidth;
        this.$refs.progress.style.width = `${offsetWidth}px`;
        this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
      }
    });
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

.ProgressBarWrapper {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: $themeColor;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -10px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $borderColor;
        border-radius: 50%;
        background: $themeColor;
      }
    }
  }
}
</style>