<template>
  <div class="home-recommend-view">
    <div v-for="item in recommends.list" :key='item.acm' class="home-recommend-view-item">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommendView',
  props: {
    recommends: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .home-recommend-view {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 18px;

    padding: 10px 0 15px;
    border-bottom: 8px solid #eee;
  }

  .home-recommend-view-item {
    flex: 1;
  }

  .home-recommend-view img {
    width: 80px;
    height: 80px;
    margin-bottom: 8px;
  }
</style>