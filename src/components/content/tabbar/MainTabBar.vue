<template>
  <tab-bar>
    <tab-bar-item v-for="item in itemInfos" :key='item.text' :link='item.link' :activeColor='item.activeColor'>
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" :alt="item.text" />
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" :alt="item.text" />
      <div slot="item-text">{{item.text}}</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar.vue'
  import TabBarItem from 'components/common/tabbar/TabBarItem.vue'

  export default {
    name: 'MainTabBar',
    components: {
      TabBar,
      TabBarItem
    },
    data() {
      return {
        itemInfos: [
          {
            text: '首页',
            icon: 'home.svg',
            iconActive: 'home_active.svg',
            link: '/home',
            activeColor: 'red'
          },{
            text: '分类',
            icon: 'category.svg',
            iconActive: 'category_active.svg',
            link: '/category',
            activeColor: 'red'
          },{
            text: '购物车',
            icon: 'shopcart.svg',
            iconActive: 'shopcart_active.svg',
            link: '/cart',
            activeColor: 'red'
          },{
            text: '我的',
            icon: 'profile.svg',
            iconActive: 'profile_active.svg',
            link: '/profile',
            activeColor: 'red'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
