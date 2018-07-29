import moment from 'moment';
import Vue from 'vue';
import XSignIn from './x-signin/x-signin.vue';
import XMedia from './x-media/x-media.vue';
import XMessageList from './x-message-list/x-message-list.vue';
import XMessageInput from './x-message-input/x-message-input.vue';

Vue.filter('datetime', (value, format) => {
  return value && moment(value).format(format || 'YYYY.MM.DD');
});

export {
  XSignIn,
  XMedia,
  XMessageList,
  XMessageInput
};
