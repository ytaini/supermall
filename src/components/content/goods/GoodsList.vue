<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goods" :key="item.acm" :goods-item="item">

    </goods-list-item> 
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem';

export default {
  props: { 
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 3px;
    justify-content: space-around;
  }

</style>