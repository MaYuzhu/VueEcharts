<template>
  <div class="wrap01">
    <div class="title">
      <slot name="title">-标题-</slot>
    </div>
    <div class="text">
      <slot name="text">--描述--</slot>
    </div>
    <div class="chart01">
      <slot name="chart01">--图表--</slot>
    </div>
  </div>
</template>

<script>
    export default {
        name: "chart01"
    }
</script>

<style scoped>
  .wrap01{
    width: 80%;
    border: 1px solid #dddcdc;
    margin: 20px auto;
  }
  .title{
    width: 100%;
    height: 36px;
    background: #c3e8f2;
    line-height: 36px;
    padding-left: 5px;
    box-sizing: border-box;
  }
  .text{

    height: 51px;
    padding: 5px;
    font-size: 13px;
    color: #808080;
    z-index: -1;
    background: #fbfbfb;
    border-bottom: 1px solid #eee;

  }
  .chart01{

  }
</style>
