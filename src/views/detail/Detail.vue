<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav"/>
    <b-scroll class="content" :probe-type='3' ref="scroll">
      <detail-swiper :topImages='topImages' @detailImgLoad='detailImgLoad' />
      <detail-base-info :goods='goods'/>
      <detail-shop-info :shop='shops'/>
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info :paramInfo='paramInfo'></detail-param-info>
    </b-scroll>
    
  </div>
</template>

<script>
  import DetailNavBar from 'views/detail/childComps/DetailNavBar';
  import DetailSwiper from 'views/detail/childComps/DetailSwiper';
  import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo';
  import BScroll from 'components/common/bScroll/BScroll';
  import DetailShopInfo from 'views/detail/childComps/DetailShopInfo';
  import DetailGoodsInfo from 'views/detail/childComps/DetailGoodsInfo';
  import DetailParamInfo from 'views/detail/childComps/DetailParamInfo';

  import * as DetailData from 'network/detail'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      BScroll
    },
    data () {
      return {
        iid: '',
        topImages: [],
        goods: {},
        shops: {},
        detailInfo: {},
        paramInfo:{}
      }
    },
    created () {
       this.iid = this.$route.params.iid 

       DetailData.getDetail(this.iid).then(res => {
        const data = res.result
         console.log(res);
        //1、获取顶部的轮播数据
        this.topImages = data.itemInfo.topImages

        //2、获取商品信息
        this.goods = new DetailData.Goods(data.itemInfo,data.columns,data.shopInfo.services,data.shopInfo.name)

        //3、获取商铺信息
        this.shops = new DetailData.Shop(data.shopInfo)

        //4、
        this.detailInfo  = data.detailInfo;

        this.paramInfo = new DetailData.GoodsParam(data.itemParams.info,data.itemParams.rule)
       })
    },
    mounted () {

    },
    methods: {
      detailImgLoad() {
        this.$refs.scroll.refresh();
      },
      imageLoad() {
        this.detailImgLoad()
      }
    }
     
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9; 
    background-color: #fff;
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>