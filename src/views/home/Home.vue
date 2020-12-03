<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="nav-bar-center">购物街</div>
    </nav-bar>

    <scroll class="content" ref="scroll" :probe-type='3' 
    @scrollPos='scrollPos' @pullingUp='pullingUp'>

      <home-swiper :banners="banners" />

      <home-recommend-view :recommends="recommends" />

      <home-feature-view />

      <tab-control class="tab-control" :titles="['流行','新款','精选']" 
                  @tabClick='tabClick' />
  
      <goods-list :goods="showGoods"/>

    </scroll>

      <back-top @click.native="backTop" v-show="isShow"/>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import HomeSwiper from 'views/home/chlidComps/HomeSwiper';
  import HomeRecommendView from 'views/home/chlidComps/HomeRecommendView'
  import HomeFeatureView from 'views/home/chlidComps/HomeFeatureView';

  import TabControl from 'components/content/tabControl/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';
  import GoodsListItem from 'components/content/goods/GoodsListItem';
  import Scroll from 'components/common/bScroll/BScroll';
  import BackTop from 'components/content/backtop/BackTop';

  import * as Home_Axios from 'network/home';

  export default {
    name: "Home",
    components: { 
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      TabControl,
      GoodsList,
      GoodsListItem,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: {},
        recommends: {},
        goods: {
          'pop': {page:0 ,list: []},
          'new': {page:0 ,list: []},
          'sell': {page:0 ,list: []}
        },
        curType: 'pop',
        isShow: false
      }
    },
    created () {

      this.getHomeMultidata();

      let type = 'pop';
      this.getHomeGoods(type);

      type = 'sell';
      this.getHomeGoods(type);

      type = 'new'
      this.getHomeGoods(type);

    },
    computed: {
      showGoods() {
        return this.goods[this.curType].list
      }
    },
    methods: {
      /* 
        事件监听相关的方法
      */
      tabClick(index) {
        //  console.log('index :>> ', index);
          switch (index) {
            case 0:
              this.curType = 'pop'
              break;
            case 1:
              this.curType = 'new'
              break;
            case 2:
              this.curType = 'sell'
              break;
          }
      },
      backTop(){
        this.$refs.scroll.scrollTo(0,0,500);
        console.log(' :>> ' );
      },
      scrollPos(position) {
        // console.log('position :>> ', position);
        this.isShow = -position.y > 1000
      },
      pullingUp() {
        this.getHomeGoods(this.curType);
      },
      /* 
        网络请求相关方法
      */
      getHomeMultidata() {
        Home_Axios.getHomeMultidata().then(res => {
          this.banners = res.data.banner;
          this.recommends = res.data.recommend;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;

        Home_Axios.getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;  /* viewport视口 height  */
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 25px;
    
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  
  .tab-control {
    /* position: sticky; */
    top: 44px;
    z-index: 9;
  }

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
