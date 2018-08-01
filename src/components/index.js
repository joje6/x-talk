import Vue from 'vue';
import VueCustomElement from 'vue-custom-element';

import XChannel from './x-channel/x-channel.vue';
import XChannels from './x-channels/x-channels.vue';
import XButton from './x-button/x-button.vue';
import XMedia from './x-media/x-media.vue';
import XMessageInput from './x-message-input/x-message-input.vue';
import XMessageList from './x-message-list/x-message-list.vue';
import XSignin from './x-signin/x-signin.vue';
import XTitlebar from './x-titlebar/x-titlebar.vue';

/*
Vue.config.ignoredElements = [
  'x-channel',
  'x-channels',
  'x-button',
  'x-media',
  'x-message-input',
  'x-message-list',
  'x-signin',
  'x-titlebar'
];
*/

Vue.use(VueCustomElement);
Vue.customElement('x-channel', XChannel);
Vue.customElement('x-channels', XChannels);
Vue.customElement('x-button', XButton);
Vue.customElement('x-media', XMedia);
Vue.customElement('x-message-input', XMessageInput);
Vue.customElement('x-message-list', XMessageList);
Vue.customElement('x-signin', XSignin);
Vue.customElement('x-titlebar', XTitlebar);

export {
  XChannel,
  XChannels,
  XButton,
  XMedia,
  XMessageInput,
  XMessageList,
  XSignin,
  XTitlebar
};
