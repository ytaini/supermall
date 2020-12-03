<template>
  <div id="tab-bar">
    <slot>

    </slot>
  </div>
</template>

<script>
  export default {
    name: 'TabBar'
  }
</script>

<style scoped>
  /* 引入其他css文件*/
  /* @import "./assets/css/base.css"; */
  @import "~assets/css/tabbar/tabbar.css";
</style>
