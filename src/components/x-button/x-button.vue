<template>
  <a class="x-button" @click="click">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'XButton',
  methods: {
    click(e) {
      this.$emit('click', e);
    }
  }
};
</script>

<style lang="less">
  @import "~@/src/less/variables";

  .x-button {
    display: inline-block;
    position: relative;
    cursor: pointer;
    line-height: 50px;
    padding: 0 15px;
    margin-top: 5px;

    &:hover {
      opacity: .6;
    }

    i {
      font-size: 1.2em;
    }
  }
</style>
