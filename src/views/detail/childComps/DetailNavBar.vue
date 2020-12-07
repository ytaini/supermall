<template>
  <div class="detail-navbar">
    <nav-bar>
      <div slot="nav-bar-left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="nav-bar-center" class="titles">
        <div v-for="(item,index) in titles" :key="item" 
        class="title-item" :class="{active: index == curIndex}"
        @click="titleClick(index)">
          <span>{{ item }}</span>
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';

  export default {
    components: {
      NavBar
    },
    data () {
      return {
        titles: ['商品','参数','评论','推荐'],
        curIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.curIndex = index ;
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .titles {
    display: flex;
    font-size: 14px;
  }
  .title-item {
    flex: 1;  
  }
  .title-item span{
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);;
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }

  .back img{
    margin-top: 13px;
  }
</style>