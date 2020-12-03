<template>
  <div class="tab-bar-item" @click="itemClick">

    <div v-if="!isActive">
      <slot  name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle" >
      <slot name="item-text"></slot>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
		props: {
			link: String,
      activeColor: {
        type: String,
        default: 'blue'
      }
		},
    data() {
      return {
        //isActive: true
      }
    },
    computed: {
      isActive() {
        // return this.$route.path == this.link
        return this.$route.path.indexOf(this.link) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {} 
      }
    },
    methods: {
      itemClick() {
        this.$router.push(this.link)
      }
    }
  }
</script>

<style scoped>
  @import "~assets/css/tabbar/tabbar-item.css";
</style>
