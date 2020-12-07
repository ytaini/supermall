<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages" :key="item" >
      <img :src="item" alt="" @load="imgLoad">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper/index.js';

  export default {
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {
        isLoad: false
      }
    },
    methods: {
      imgLoad() {
        if (!this.isLoad){
          this.$emit('detailImgLoad')

          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 280px;
    /* overflow: hidden; */
  }
</style>