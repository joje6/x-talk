<template>
  <div class="x-titlebar">
    <div class="x-titlebar-left">
      <slot name="left" />
    </div>
    <div class="x-titlebar-center">
      <slot name="center" />
    </div>
    <div class="x-titlebar-right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'XTitlebar'
};
</script>


<style lang="less">
  @import "~@/src/less/variables";

  .x-titlebar {
    display: table;
    table-layout: fixed;
    width: 100%;
    position: relative;
    color: white;
    background-color: #3C1E1F;
    border-bottom: 1px solid darken(#3C1E1F, 20%);
    transition: background-color .35s;

    .x-titlebar-left {
      display: table-cell;
      vertical-align: middle;
      padding-right: 10px;
    }

    .x-titlebar-right {
      display: table-cell;
      vertical-align: middle;
      padding-left: 10px;
      text-align: right;
    }

    .x-titlebar-center {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      line-height: 50px;
      font-weight: lighter;
      letter-spacing: 1px;
    }
  }
</style>
