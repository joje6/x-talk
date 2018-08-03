<template>
  <div class="x-message-input">
    <div class="x-message-input-box">
      <textarea v-model="message" :disabled="!channelid" @keypress.enter="enter" />
    </div>
    <div :disabled="!message" class="x-message-input-file" @click="sendimage">
      <i class="icon-image" />
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
    sendimage() {
      const input = document.createElement('input');
      input.type = 'file';
      input.onchange = () => {
        const formdata = new window.FormData();
        formdata.append('file', input.files[0]);

        (async () => {
          try {
            const channelid = this.channelid;
            const channel = connect.channel(channelid);
            await channel.sendimage(formdata, (progress) => {
              console.log(`${progress}% uploaded`);
            });
            this.$emit('sendimage', input.files[0]);
          } catch(err) {
            this.$emit('sendimageerror', err);
          }
        })();
      };
      input.click();
    },
    send() {
      const channelid = this.channelid;
      const message = this.message;
      if( !channelid ) return console.error('missing channelid');
      if( !message ) return console.error('missing message');

      this.$nextTick(async () => {
        this.message = '';

        try {
          const channel = connect.channel(channelid);
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

<style>
  .x-message-input {
    display: table;
    width: 100%;
    table-layout: fixed;
    border-top: 1px solid var(--border-color);
    padding: 5px;
    box-sizing: border-box;

    & .x-message-input-box {
      display: table-cell;
      height: 60px;

      & textarea {
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

    & .x-message-input-file {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      width: 50px;
      cursor: pointer;

      & i {
        font-size: 40px;
        line-height: 60px;
        color: #999;
      }
    }

    & .x-message-input-button {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      width: 100px;
      cursor: pointer;
      background-color: var(--brand-info);
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
