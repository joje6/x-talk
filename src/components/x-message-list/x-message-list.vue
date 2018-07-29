<template>
  <div class="x-message-list">
    <div v-for="message in messages" :key="message.id" class="x-message-list-message">
      <div v-if="message.type !== 'message'" class="x-message-list-message-info">{{ message.text }}</div>

      <div v-if="message.type == 'message' && message.user.id !== user.id" class="x-message-list-message-other">
        <div class="x-message-list-message-user">{{ message.user.email }}</div>
        <div class="x-message-list-message-box">{{ message.text }}</div>
        <div class="x-message-list-message-date">{{ message.date | datetime('MM월 DD일 HH시 mm분') }}</div>
      </div>

      <div v-if="message.type == 'message' && message.user.id === user.id" class="x-message-list-message-self">
        <div v-if="message.text" class="x-message-list-message-box">{{ message.text }}</div>
        <div v-if="message.url" class="x-message-list-message-box"><img :src="message.url | url"></div>
        <div class="x-message-list-message-date">{{ message.date | datetime('MM월 DD일 HH시 mm분') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import connect from 'x-talk-connect';

export default {
  name: 'XMessageList',
  components: {},
  filters: {
    url(value) {
      return connect.resolve(value);
    }
  },
  props: {
    channelid: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      messages: [],
      user: null
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
        const user = await connect.session();
        const channelinfo = await connect.channel(this.channelid).info();
        if( !channelinfo ) return console.error('not exists channel');

        this.user = user;
        channelinfo.messages && this.messages.push(...channelinfo.messages);
        console.log('user', user);
        console.log('channel', channelinfo.messages);
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
    background-color: #A2C1D7;
    font-size: 14px;
    padding: 20px 0;

    .x-message-list-message-info {
      font-size: 0.8em;
      padding: 10px 0;
      color: #775743;
      text-align: center;
    }

    .x-message-list-message-box {
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 10px;
      background-color: white;
      padding: 6px 12px;
      max-width: 45%;

      img {
        display: block;
        width: 100%;
        min-width: 150px;
      }
    }

    .x-message-list-message-other {
      margin-left: 15px;
    }

    .x-message-list-message-user {
      font-size: 0.8em;
    }

    .x-message-list-message-self {
      text-align: right;
      margin-right: 15px;

      .x-message-list-message-box {
        background-color:#FADD52;
      }
    }

    .x-message-list-message-date {
      font-size: 0.8em;
      padding: 5px 0 15px;
    }
  }
</style>
