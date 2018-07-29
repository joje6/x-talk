<template>
  <div class="page-channel">
    <x-titlebar>
      <div slot="left">
        <x-button title="목록으로" @click="channels"><i class="icon-chevron-left" /></x-button>
      </div>
      <div slot="center">
        {{ title }}
      </div>
      <div slot="right">
        <x-button title="초대하기" @click="invite"><i class="icon-plus" /></x-button>
        <x-button title="나가기" @click="leave"><i class="icon-x" /></x-button>
      </div>
    </x-titlebar>

    <x-message-list :channelid="channelid" />
    <x-message-input :channelid="channelid" />
  </div>
</template>

<script>
import XButton from '../x-button/x-button.vue';
import XTitlebar from '../x-titlebar/x-titlebar.vue';
import XMessageInput from '../x-message-input/x-message-input.vue';
import XMessageList from '../x-message-list/x-message-list.vue';
import connect from 'x-talk-connect';
import xrouter from 'x-router';
import swal from 'sweetalert';

export default {
  name: 'PageChannel',
  components: { XMessageInput, XMessageList, XTitlebar, XButton },
  props: {
    channelid: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loaded: false,
      channel: null,
      channelinfo: null
    };
  },
  computed: {
    title() {
      const channelinfo = this.channelinfo;
      return channelinfo && channelinfo.title;
    }
  },
  mounted() {
    this.refresh();
  },
  methods: {
    channels() {
      xrouter.href('/channel');
    },
    leave() {
      if( !this.channel ) return;

      this.$nextTick(async () => {
        const confirm = await swal({
          title: '채널에서 나가시겠습니까?',
          icon: 'warning',
          buttons: true
        });

        if( !confirm ) return;

        try {
          await this.channel.leave();
        } catch(err) {
          console.warn('leave error', err);
        } finally{
          xrouter.href('/channel');
        }
      });
    },
    refresh() {
      this.$nextTick(async () => {
        try {
          const session = await connect.session();
          if( !session ) return xrouter.href('/');

          const channelid = this.channelid;
          if( !channelid ) throw new Error('missing channelid');

          const channel = this.channel = connect.channel(channelid);
          this.channelinfo = await channel.join();
        } catch(err) {
          console.warn(err);
          swal('채널을 불러올 수 없습니다.', err.message, 'error');
        } finally{
          this.loaded = true;
        }
      });

    },
    invite() {
      this.$nextTick(async () => {
        const email = await swal({
          title: '초대할 사용자 이메일을 입력해주세요',
          content: 'input',
          icon: 'info',
          button: {
            text: '초대하기',
            closeModal: true
          }
        });

        if( !email ) return;

        try {
          await this.channel.invite(email);
        } catch(err) {
          console.warn(err);
          swal('초대할 수 없습니다.', err.message, 'error');
        }
      });
    }
  }
};
</script>

<style lang="less">
  @import "~@/src/less/variables";

  .page-channel {
  }
</style>
