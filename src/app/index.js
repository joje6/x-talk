import Vue from 'vue';
import moment from 'moment';
import xrouter from 'x-router';
import PageChannel from '../components/page-channel/page-channel.vue';
import PageChannels from '../components/page-channels/page-channels.vue';
import PageSignin from '../components/page-signin/page-signin.vue';

Vue.filter('date', (value, format) => {
  return value && moment(value).format(format || 'MM.DD HH:mm');
});

const app = xrouter()
  .get('/', 'signin')
  .get('/signin', () => {
    const component = new Vue(PageSignin);
    const target = document.querySelector('body > #page');
    target.innerHTML = '';
    target.appendChild(component.$mount().$el);
  })
  .get('/channel', () => {
    const component = new Vue(PageChannels);
    const target = document.querySelector('body > #page');
    target.innerHTML = '';
    target.appendChild(component.$mount().$el);
  })
  .get('/channel/:channelid', (req) => {
    const component = new Vue(PageChannel);
    component.channelid = req.params.channelid;

    const target = document.querySelector('body > #page');
    target.innerHTML = '';
    target.appendChild(component.$mount().$el);
  });

export default app;
