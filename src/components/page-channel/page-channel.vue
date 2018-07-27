<template>
  <div class="page-channel">
    <XTitlebar title="X TALK">
      <div slot="left">
        <XButton title="목록으로" @click="channels"><i class="icon-chevron-left" /></XButton>
      </div>
      <div slot="right">
        <XButton title="초대하기" @click="invite"><i class="icon-plus" /></XButton>
        <XButton title="나가기" @click="leave"><i class="icon-x" /></XButton>
      </div>
    </XTitlebar>

    <div v-if="channelinfo">
      {{ channelinfo }}
    </div>

    <XMessageList :channelid="channelid" />
    <XMessageInput :channelid="channelid" />
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
  },
  data() {
    return {
      loaded: false,
      channelid: null,
      channel: null,
      channelinfo: null
    };
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
