import { storiesOf } from '@storybook/vue';
//import { linkTo } from '@storybook/addon-links';

import XChannel from '@/src/components/x-channel/x-channel.vue';
import XChannels from '@/src/components/x-channels/x-channels.vue';
import XSignin from '@/src/components/x-signin/x-signin.vue';
import XButton from '@/src/components/x-button/x-button.vue';
import XMedia from '@/src/components/x-media/x-media.vue';
import XMessageInput from '@/src/components/x-message-input/x-message-input.vue';
import XMessageList from '@/src/components/x-message-list/x-message-list.vue';
import XTitlebar from '@/src/components/x-titlebar/x-titlebar.vue';
import connect from 'x-talk-connect';


export const stories = async () => {
  const session = await connect.signin({
    email: 'test@test'
  });

  const channelinfo = await connect.create({
    title: '테스트 채널'
  });

  console.log('session', session);
  console.log('channelinfo', channelinfo);

  const channelid = channelinfo.id;

  return () => {
    storiesOf('컴포넌트', module)
      .add('로그인', () => ({
        components: { XSignin },
        template: '<x-signin />',
        //methods: { action: linkTo('Button') }
      }))
      .add('채널목록', () => ({
        components: { XChannels },
        template: '<x-channels @select="" />'
      }))
      .add('채팅창', () => ({
        components: { XChannel },
        template: `<x-channel data-channelid="${channelid}" />`,
      }))
      .add('버튼', () => ({
        components: { XButton },
        template: '<x-button>\
        텍스트\
        </x-button>'
      }))
      .add('미디어', () => ({
        components: { XMedia },
        template: '<x-media title="제목" thumbnail="">\
        <span slot="right">텍스트</span>\
        </x-media>'
      }))
      .add('타이틀바', () => ({
        components: { XTitlebar },
        template: '<x-titlebar>\
        <div slot="left">\
          좌측\
        </div>\
        <div slot="center">\
          제목\
        </div>\
        <div slot="right">\
          우측\
        </div>\
        </x-titlebar>'
      }))
      .add('메시지입력기', () => ({
        components: { XMessageInput },
        template: `<x-message-input channelid="${channelid}" />`
      }))
      .add('메시지목록', () => ({
        components: { XMessageList },
        template: `<x-message-list channelid="${channelid}" />`
      }));
  };
};
