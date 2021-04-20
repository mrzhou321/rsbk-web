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
.el-dialog {
  // border-radius: 5px !important;
  background-color: transparent !important;
  .el-dialog__header {
    padding: 10px 0 10px 15px !important;
    text-align: left !important;
    background-color: #1890ff;
    border-radius: 5px 5px 0 0 !important;
    .el-dialog__title {
      color: #fff !important;
      font-size: 16px !important;
    }
    .el-dialog__headerbtn {
      top: 13px !important;
      right: 10px !important;
      .el-dialog__close {
        color: #fff !important;
      }
    }
  }
  .el-dialog__body {
    padding: 10px 20px !important;
    background-color: #fff !important;
  }
  .el-dialog__footer {
    text-align: center !important;
    padding: 10px 20px !important;
    background-color: #f9f9f9 !important;
    border-radius: 0 0 5px 5px !important;
  }
}

</style>
