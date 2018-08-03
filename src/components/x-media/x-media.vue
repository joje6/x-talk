<template>
  <div class="x-media">
    <div class="x-media-left">
      <div :style="backgroundstyle" class="x-media-image" @click="select" />
    </div>
    <div class="x-media-body" @click="select">
      <h4 class="x-media-heading">{{ title }}</h4>
    </div>
    <div class="x-media-right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'XMedia',
  components: {},
  props: {
    title: {
      type: String,
      default: '제목없음'
    },
    thumbnail: {
      type: String,
      default: 'http://qualiscare.com/wp-content/uploads/2017/08/default-user.png'
    }
  },
  computed: {
    backgroundstyle() {
      return {
        backgroundImage: `url(${this.thumbnail})`
      };
    }
  },
  methods: {
    select() {
      this.$emit('select');
    }
  }
};
</script>


<style>
  .x-media {
    cursor: pointer;
    position: relative;
    overflow: initial;
    padding: 10px 20px;
    margin: 0;
    border-bottom: 1px solid var(--border-color);
    transition: background-color .35s;

    & .x-media-left {
      display: table-cell;
      vertical-align: middle;
      padding-right: 10px;
    }

    & .x-media-right {
      display: table-cell;
      vertical-align: middle;
      padding-left: 10px;
    }

    & .x-media-body {
      display: table-cell;
      vertical-align: middle;
      width: 10000px;
    }

    & .x-media-image {
      width: 30px;
      position: relative;
      padding-top: 100%;
      border-radius: 50%;
      background-position: center center;
      background-size: 100% auto;
      background-repeat: no-repeat;
    }

    & .x-media-heading {
      font-size: 1em;
      font-weight: bold;
    }

    &:hover {
      background-color: #fafafa;
    }
  }
</style>
