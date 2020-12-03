<template>
  <div class="wrapper" ref="scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BS from 'better-scroll';

  export default {
    props:{
      probeType: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        bs: null
      }
    },
    mounted () {
      this.init()
    },
    beforeDestroy () {
      this.bs.destroy()
    },
    methods: {
      init() {
        this.bs = new BS(this.$refs.scroll,{
          probeType: this.probeType,
          click: true,
          pullUpLoad: true
        })

        this.bs.on('scroll',(position) => {
          // console.log('position :>> ', position);
          this.$emit('scrollPos',position)
        })

        this.bs.on('scrollEnd',() => {
          // console.log('滚动结束');
        })

        this.bs.on('pullingUp',() =>{
          this.$emit('pullingUp')
        })
      }, 
      scrollTo(x ,y , time = 300) {
        this.bs.scrollTo(x,y,time);
      },
      finishPullUp() {
        this.scroll.finishPullUp();
      }
    }
  }
</script>

<style scoped>

</style>