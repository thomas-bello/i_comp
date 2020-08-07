<template>
  <div class="wrapper">
    <el-carousel
      ref="carousel"
      :height="height"
      direction="vertical"
      :autoplay="false"
    >
      <el-carousel-item v-for="(item, index) in props" :key="item.key || index">
        <component :is="item.type || 'Wrapper'" v-bind="item">
          {{ item.slotValue || '' }}
        </component>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import Wrapper from '../global/Wrapper'

export default {
  name: 'CarouselPage',
  components: {
    Wrapper,
  },
  props: {
    props: {
      type: Array,
      default: () => [],
    },
    config: {
      type: Object,
      default: () => ({
        scrollHoldTime: 1500,
      }),
    },
  },
  data() {
    return {
      height: '100px',
    }
  },
  mounted() {
    this.setHeight()
    window.onresize = () => {
      this.setHeight()
    }
    this.listener()
  },
  methods: {
    listener() {
      // 浏览器兼容
      if (navigator.userAgent.toLowerCase().includes('firefox')) {
        document.addEventListener('DOMMouseScroll', this.onScroll, false)
      } else if (document.addEventListener) {
        document.addEventListener('mousewheel', this.onScroll, false)
      } else if (document.attachEvent) {
        document.attachEvent('onmousewheel', this.onScroll)
      } else {
        document.onmousewheel = this.onScroll
      }
    },
    setHeight() {
      const h = document.body.clientHeight
      this.height = `${h}px`
    },
    onScroll(event) {
      this.startTime = new Date().getTime()
      if (!this.endTime) {
        this.endTime = new Date().getTime()
      }
      // mousewheel事件中的 “event.wheelDelta” 属性值：返回的如果是正值说明滚轮是向上滚动
      // DOMMouseScroll事件中的 “event.detail” 属性值：返回的如果是负值说明滚轮是向上滚动
      const delta = event.detail || -event.wheelDelta
      // 如果当前滚动开始时间和上次滚动结束时间的差值小于1.5s，则不执行翻页动作，这样做是为了实现类似节流的效果
      if (this.startTime - this.endTime > this.config.scrollHoldTime) {
        const { next, prev } = this.$refs.carousel || {}
        if (delta > 0) {
          // 向下滚动
          console.log('向下滚动')
          if (next) next()
        } else if (delta < 0) {
          // 向上滚动
          console.log('向上滚动')
          if (prev) prev()
        }
        // 本次翻页结束，记录结束时间，用于下次判断
        this.endTime = new Date().getTime()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  ::v-deep {
    .el-carousel__indicators--vertical {
      left: 0;
      right: auto;
      display: flex;
      flex-direction: column;
      align-items: center;

      .el-carousel__indicator--vertical {
        padding: 0.75rem 1.75rem;
      }

      .el-carousel__button {
        background-color: #000;
        height: 2rem;
        border-radius: 2px;
      }
      .is-active {
        .el-carousel__button {
          width: 0.25rem;
        }
      }
    }
  }
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
