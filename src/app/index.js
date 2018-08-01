import xrouter from 'x-router';
import swal from 'sweetalert';
import connect from 'x-talk-connect';

connect.on('invite', async (invite) => {
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

export default xrouter()
  .set('view target', '#page')
  .get('/', 'signin')
  .get('/signin', (req, res, next) => {
    (async () => {
      await import(/* webpackChunkName: "x-signin" */ '../components/x-signin');

      res.render.html(require('./pages/signin.html'), (err, target) => {
        if( err ) return next(err);

        const xsignin = target.querySelector('x-signin');
        xsignin.addEventListener('signin', () => {
          xrouter.href('/channel');
        });

        xsignin.addEventListener('error', () => {
          swal('로그인 실패', `오류내용 : ${err.message}`, 'error');
        });
      }).end();
    })();
  })
  .get('/channel', (req, res) => {
    (async () => {
      await import(/* webpackChunkName: "x-channels" */ '../components/x-channels');
      await import(/* webpackChunkName: "x-titlebar" */ '../components/x-titlebar');
      await import(/* webpackChunkName: "x-button" */ '../components/x-button');

      res.render.html(require('./pages/channels.html'), (err, target) => {

        const xchannels = target.querySelector('x-channels');
        xchannels.addEventListener('create', (e) => {
          xrouter.href(`/channel/${e.detail[0].id}`);
        });

        xchannels.addEventListener('select', (e) => {
          xrouter.href(`/channel/${e.detail[0].id}`);
        });

        const btn_signout = target.querySelector('.page-channels-btn-signout');
        btn_signout.addEventListener('click', () => {
          (async () => {
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
          })();
        });

        const btn_create = target.querySelector('.page-channels-btn-create');
        btn_create.addEventListener('click', () => {
          xchannels.getVueInstance().create();
        });
      }).end();
    })();
  })
  .get('/channel/:channelid', (req, res, next) => {
    (async () => {
      await import(/* webpackChunkName: "x-channel" */ '../components/x-channel');
      await import(/* webpackChunkName: "x-titlebar" */ '../components/x-titlebar');
      await import(/* webpackChunkName: "x-button" */ '../components/x-button');

      res.render.html(require('./pages/channel.html'), (err, target) => {
        if( err ) return next(err);

        const xchannel = target.querySelector('x-channel');
        xchannel.setAttribute('data-channelid', req.params.channelid);

        const channeltitle = target.querySelector('.page-channel-title');
        channeltitle.innerHTML = xchannel.title || '';

        xchannel.addEventListener('load', (e) => {
          channeltitle.innerHTML = e.detail[0].title || '';
        });

        xchannel.addEventListener('disconnect', () => {
          xrouter.href('/channel');
        });

        const btn_prev = target.querySelector('.page-channel-btn-prev');
        btn_prev.addEventListener('click', () => {
          xrouter.href('/channel');
        });

        const btn_invite = target.querySelector('.page-channel-btn-invite');
        btn_invite.addEventListener('click', () => {
          xchannel.getVueInstance().invite();
        });

        const btn_leave = target.querySelector('.page-channel-btn-leave');
        btn_leave.addEventListener('click', () => {
          xchannel.getVueInstance().leave();
        });
      }).end();
    })();
  });
