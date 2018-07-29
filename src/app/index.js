import Vue from 'vue';
import xrouter from 'x-router';
import connect from 'x-talk-connect';
import swal from 'sweetalert';
import PageChannel from '../components/page-channel/page-channel.vue';
import PageChannels from '../components/page-channels/page-channels.vue';
import PageSignin from '../components/page-signin/page-signin.vue';

connect.on('invite', async (invite) => {
  console.info('채널로의 초대', invite);

  const confirm = await swal({
    title: '초대 요청을 수락하시겠습니까?',
    text: `${invite.inviter.email} 님이 ${invite.channel.title} 채널로 초대하였습니다.`,
    icon: 'info',
    buttons: true
  });

  if( confirm ) {
    xrouter.href(`/channel/${invite.channel.id}`);
  }
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
