<template>
  <div id="home">

    <nav-bar class="home-nav">
      <div slot="nav-bar-center">购物街</div>
    </nav-bar>

    <tab-control class="tab-control-fix"  
                :titles="titles" 
                @tabClick='tabClick' 
                v-show="isTabFixed" 
                ref="tabControl2"/>

    <scroll class="content" 
            ref="scroll" 
            :probe-type='probeType' 
            @scrollPos='scrollPos' 
            @pullingUp='pullingUp'>

      <home-swiper :banners="banners" @swiperImgLoad='swiperImgLoad' />

      <home-recommend-view :recommends="recommends" />

      <home-feature-view />

      <tab-control  :titles="titles" 
                  @tabClick='tabClick' 
                  ref="tabControl1" />
  
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
  import * as Utils from 'common/utils'

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
        isShow: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        titles: ['流行','新款','精选'],
        probeType: 3,
        saveY: 0
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
    mounted () {
      const refresh = Utils.debounce(this.$refs.scroll.refresh,500);

      //监听item中图片加载完成
      this.$bus.$on('imageLoadFinish',() => {
        // console.log('imageLoadFinish')
        // this.$refs.scroll.refresh();
        // refresh('a');
        refresh()
      }) 

      //获取tabControl的offsetTop
      //所有的组件都有一个属性$el:用于获取组件中的元素
      // console.log('this.$refs.tabControl.$el :>> ', this.$refs.tabControl.$el);
      //console.log(this.$refs.tabControl.$el.offsetTop) //获取的值不正确.图片还未加载。

    },
    destroyed () {

    },
    activated() {
      this.goScrollY()
    },
    deactivated () {
      this.saveScrollY()
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
      goScrollY() {
        this.$refs.scroll.scrollTo(0,this.saveY,0);

        this.$refs.scroll.refresh()
      },
      saveScrollY() {
        this.saveY = this.$refs.scroll.getY()
      },
      swiperImgLoad() {
        this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
      },
      tabClick(index) {
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
          this.$refs.tabControl1.curIndex = index 
          this.$refs.tabControl2.curIndex = index 
      },
      backTop(){
        /* 返回顶部 */
        this.$refs.scroll.scrollTo(0,0,500);

      },
      scrollPos(position) {
        // console.log('position :>> ', position);
        //1、判断BackTop是否显示
        this.isShow = -position.y > 1000

        //2、决定tabControl是否吸顶
        this.isTabFixed = -position.y > this.tabOffsetTop
      },
      pullingUp() {
        /* 请求数据 */
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
    /* padding-top: 44px; */
    height: 100vh;  /* viewport视口 height  */
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 25px;
    
    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control-fix {
    position: relative;
    z-index: 9;
  }

  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  } */


  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
