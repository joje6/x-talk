import { storiesOf } from '@storybook/vue';
//import { linkTo } from '@storybook/addon-links';
import {
  PageChannel,
  PageChannels,
  PageSignin,
  XButton,
  XMedia,
  XMessageInput,
  XMessageList,
  XSignIn,
  XTitlebar
} from '@/src/components';
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
    storiesOf('페이지', module)
      .add('로그인', () => ({
        components: { PageSignin },
        template: '<page-signin />',
        //methods: { action: linkTo('Button') }
      }))
      .add('채널목록', () => ({
        components: { PageChannels },
        template: '<page-channels @select="" />'
      }))
      .add('채팅창', () => ({
        components: { PageChannel },
        template: `<page-channel channelid="${channelid}" />`,
      }));

    storiesOf('컴포넌트', module)
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
      .add('로그인', () => ({
        components: { XSignIn },
        template: '<x-sign-in />'
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
