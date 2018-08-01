<template>
  <div class="x-channel">
    <div v-if="channelid">
      <x-message-list :channelid="channelid" />
      <x-message-input :channelid="channelid" />
    </div>
  </div>
</template>

<script>
import XButton from '../x-button/x-button.vue';
import XTitlebar from '../x-titlebar/x-titlebar.vue';
import XMessageInput from '../x-message-input/x-message-input.vue';
import XMessageList from '../x-message-list/x-message-list.vue';
import connect from 'x-talk-connect';
import swal from 'sweetalert';

export default {
  name: 'XChannel',
  components: {
    XButton,
    XTitlebar,
    XMessageInput,
    XMessageList
  },
  props: {
    dataChannelid: {
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
    channelid() {
      return this.dataChannelid;
    },
    title() {
      const channelinfo = this.channelinfo;
      return channelinfo && channelinfo.title;
    }
  },
  mounted() {
    this.refresh();
  },
  methods: {
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
          err.type = 'leave';
          this.$emit('error', err);
        } finally {
          this.$emit('leave');
          this.disconnect();
        }
      });
    },
    disconnect(message) {
      this.$emit('disconnect', message);
    },
    refresh() {
      this.$nextTick(async () => {
        try {
          const session = await connect.session();
          if( !session ) return this.disconnect();

          const channelid = this.channelid;
          if( !channelid ) throw new Error('missing channelid');

          const channel = this.channel = connect.channel(channelid);
          const channelinfo = this.channelinfo = await channel.join();
          this.$emit('load', channelinfo);
        } catch(err) {
          err.type = 'load';
          this.$emit('error', err);
          swal('채널을 불러올 수 없습니다.', err.message, 'error');
          this.disconnect();
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
          const result = await this.channel.invite(email);
          this.$emit('invite', result);
        } catch(err) {
          err.type = 'invite';
          this.$emit('error', err);
          swal('초대할 수 없습니다.', err.message, 'error');
        }
      });
    }
  }
};
</script>
