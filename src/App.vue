<template>
  <div id="app">
    <HelloWorld msg="2021上半年事业单位联考"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.normal-dialog {
.el-dialog {
  min-width: 800px;
}
.el-card__header,
.el-divider__text {
  color: #1890ff;
}

}
</style>
