<template>
  <div class="x-channels">
    <div v-if="loaded">
      <div v-if="channels.length">
        <x-media v-for="channel in channels" :key="channel.id" :title="channel.title" :thumbnail="channel.thumbnail" @select="select(channel)">
          <span slot="right"><i class="icon-chevron-right" /></span>
        </x-media>
      </div>
      <div v-if="!channels.length">
        <div class="x-channels-empty">
          <div class="x-channels-empty-icon"><i class="icon-alert-circle" /></div>
          <div class="x-channels-empty-text">개설된 채널이 없습니다.</div>
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
import swal from 'sweetalert';

export default {
  name: 'XChannels',
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
    refresh() {
      this.$nextTick(async () => {
        try {
          const session = await connect.session();
          if( !session ) return console.error('session disconnected');

          const channels = this.channels = await connect.channels();
          this.$emit('refresh', channels);
          //console.log('refresh channels', channels);
        } catch(err) {
          err.type = 'refresh';
          this.$emit('error', err);
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

          this.$emit('create', channel);
        } catch(err) {
          err.type = 'create';
          this.$emit('error', err);
          swal('채널을 개설하는 중 오류가 발생했습니다.', err.message, 'error');
        }
      });
    },
    select(channel) {
      this.$emit('select', channel);
    }
  }
};
</script>

<style lang="vless">
  @import "~@/src/less/variables";

  .x-channels {
    .x-channels-empty {
      text-align: center;
      padding: 200px 0;

      .x-channels-empty-icon {
        font-size: 120px;
        color: @text-color;
      }

      .x-channels-empty-text {
        font-size: 1.25em;
        font-weight: normal;
        color: fade(@text-color, 80%);
        line-height: 60px;
        text-shadow: 2px 2px 3px rgba(255,255,255,0.1);
      }
    }
  }
</style>
