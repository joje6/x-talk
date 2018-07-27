<template>
  <div class="x-message-input">
    <div class="x-message-input-box">
      <textarea v-model="message" :disabled="!channelid" @keyup.enter="enter" />
    </div>
    <div :disabled="!message" class="x-message-input-button" @click="send">
      전송하기
    </div>
  </div>
</template>

<script>
import connect from 'x-talk-connect';

export default {
  name: 'XMessageInput',
  components: {},
  props: {
    channelid: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      message: ''
    };
  },
  methods: {
    enter(e) {
      if( !e.shiftKey ) this.send();
    },
    send() {
      const channelid = this.channelid;
      const message = this.message;
      if( !channelid || !message ) return;

      this.message = '';
      this.$nextTick(async () => {
        try {
          const channel = await connect.channel(channelid);
          if( !channel ) return;

          await channel.send(message);
          this.$emit('send', message);
        } catch(err) {
          this.$emit('senderror', err);
        }
      });
    }
  }
};
</script>

<style lang="less">
  @import "~@/src/less/variables";

  .x-message-input {
    display: table;
    width: 100%;
    table-layout: fixed;
    border-top: 1px solid @border-color;
    padding: 5px;
    box-sizing: border-box;

    .x-message-input-box {
      display: table-cell;
      height: 60px;

      textarea {
        display: block;
        width: 100%;
        height: 100%;
        border: 0;
        resize: none;
        outline: none;
        font-size: 1em;

        &:hover, &:focus {
          outline: none;
        }
      }
    }

    .x-message-input-button {
      display: table-cell;
      cursor: pointer;
      width: 100px;
      text-align: center;
      vertical-align: middle;
      background-color: @brand-info;
      margin: 8px;
      font-size: 0.9em;
      font-weight: bold;
      color: white;
      border-radius: 6px;

      &[disabled] {
        cursor: initial;
        opacity: .6;
        color: #efefef;
      }
    }
  }
</style>
