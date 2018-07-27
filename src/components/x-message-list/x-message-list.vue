<template>
  <div class="x-message-list">
    <div v-for="message in messages" :key="message.id" class="x-message-list-message">
      {{ message.text }}
    </div>
  </div>
</template>

<script>
import connect from 'x-talk-connect';

export default {
  name: 'XMessageList',
  components: {},
  props: {
    channelid: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      messages: []
    };
  },
  mounted() {
    this.connect();
    this.refresh();
  },
  methods: {
    connect() {
      if( !this.channelid ) return console.error('missing channelid');

      if( this._listener ) return;
      this._listener = (message) => {
        console.log('message(listener)', message);
        this.append(message);
      };

      const channel = connect.channel(this.channelid);
      channel.on('message', this._listener);
    },
    disconnect() {
      if( !this._listener ) return;

      const channel = connect.channel(this.channelid);
      channel.off('message', this._listener);
      delete this.listener;
    },
    append(message) {
      this.messages.push(message);
    },
    refresh() {
      this.$nextTick(async () => {
        const channelinfo = await connect.channel(this.channelid).info();
        if( !channelinfo ) return console.error('not exists channel');
        console.log('channel', channelinfo.messages);
        channelinfo.messages && this.messages.push(...channelinfo.messages);
        console.log('this.messages', this.messages);
      });
    }
  }
};
</script>

<style lang="less">
  @import "~@/src/less/variables";

  .x-message-list {
    min-height: 300px;
  }
</style>
