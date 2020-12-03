<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners.list" :key="item.acm">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
  
</template>

<script>

import { Swiper, SwiperItem } from 'components/common/swiper';

export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>

</style>