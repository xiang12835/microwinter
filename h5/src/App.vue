<template>
  <div id="app">
    <router-view/>
    <TabBar/>
  </div>
</template>

<script>
  import TabBar from './components/TabBar.vue'

  export default {
    name: 'App',
    components:{
      TabBar,
    },
}
</script>

<style lang="less">
  @import "style/style.css";
  .content {
    /*margin-top: 50px*/
  }
</style>
