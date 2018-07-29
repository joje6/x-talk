<template>
  <div class="page-channels">
    <XTitlebar title="X TALK">
      <div slot="left">
        <XButton title="로그아웃" @click="signout"><i class="icon-chevron-left" /></XButton>
      </div>
      <div slot="right">
        <XButton title="채널 개설하기" @click="create"><i class="icon-plus" /></XButton>
      </div>
    </XTitlebar>

    <div v-if="loaded">
      <div v-if="channels.length">
        <XMedia v-for="channel in channels" :key="channel.id" :title="channel.title" :thumbnail="channel.thumbnail" @select="join(channel.id)">
          <span slot="right">{{ channel.created | datetime('HH:mm') }}</span>
        </XMedia>
      </div>
      <div v-if="!channels.length">
        <div class="page-channels-empty">
          <div class="page-channels-empty-icon"><i class="icon-alert-circle" /></div>
          <div class="page-channels-empty-text">개설된 채널이 없습니다.</div>
        </div>
      </div>
    </div>

    <div v-if="!loaded">
      채널 목록을 불러오는 중입니다.
    </div>
  </div>
</template>

<script>
import XMedia from '../x-media/x-media.vue';
import XButton from '../x-button/x-button.vue';
import XTitlebar from '../x-titlebar/x-titlebar.vue';
import connect from 'x-talk-connect';
import xrouter from 'x-router';
import swal from 'sweetalert';

export default {
  name: 'PageChannels',
  components: { XMedia, XTitlebar, XButton },
  data() {
    return {
      loaded: false,
      channels: []
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    signout() {
      this.$nextTick(async () => {
        const confirm = await swal({
          title: '로그아웃하시겠습니까?',
          icon: 'warning',
          buttons: true
        });

        if( confirm ) {
          await connect.signout();
          swal('로그아웃 되었습니다.', '', 'success');
          xrouter.href('/');
        }
      });
    },
    refresh() {
      this.$nextTick(async () => {
        try {
          const session = await connect.session();
          if( !session ) return xrouter.href('/');

          this.channels = await connect.channels();
          console.log('refresh channels', this.channels);
        } catch(err) {
          console.error(err);
          swal('채널 목록을 불러올 수 없습니다.', err.message, 'error');
        } finally{
          this.loaded = true;
        }
      });
    },
    create() {
      this.$nextTick(async () => {
        const title = await swal({
          title: '채널 제목을 입력해주세요',
          content: 'input',
          icon: 'info',
          button: {
            text: '채널 개설하기',
            closeModal: true
          }
        });

        if( !title ) return;

        try {
          const channel = await connect.create({
            title
          });

          console.log('channel created', channel);

          await this.refresh();
          xrouter.href(`/channel/${channel.id}`);
        } catch(err) {
          swal('채널을 개설하는 중 오류가 발생했습니다.', err.message, 'error');
        }
      });
    },
    join(channelid) {
      xrouter.href(`/channel/${channelid}`);
    }
  }
};
</script>

<style lang="less">
  @import "~@/src/less/variables";

  .page-channels {

    .page-channels-empty {
      text-align: center;
      padding: 200px 0;

      .page-channels-empty-icon {
        font-size: 120px;
        color: @text-color;
      }

      .page-channels-empty-text {
        font-size: 1.25em;
        font-weight: normal;
        color: fade(@text-color, 80%);
        line-height: 60px;
        text-shadow: 2px 2px 3px rgba(255,255,255,0.1);
      }
    }
  }
</style>
