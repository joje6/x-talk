import Vue from 'vue';
import connect from 'x-talk-connect';
import XMessageList from '@/src/components/x-message-list/x-message-list';

describe('XMessageList 컴포넌트', () => {
  const vm = new Vue(XMessageList);
  let channel, channelinfo, session;

  beforeAll((done) => {
    (async () => {
      session = await connect.signin({
        email: 'test@test'
      });

      channelinfo = await connect.create({
        title: '테스트 채널'
      });

      channel = connect.channel(channelinfo.id);
      console.log('session', session);
      console.log('channelinfo', channelinfo);
      console.log('vm.channelid', vm.channelid);

      Vue.set(vm, 'channelid', channelinfo.id);
      vm.$mount();
      done();
    })();
  });

  it('컴포넌트 설정 체크', () => {
    expect(typeof XMessageList).toBe('object');
    expect(XMessageList.name).toBe('XMessageList');
  });

  it('인스턴스 상태 체크', () => {
    expect(vm).not.toBe(null);
    expect(vm instanceof Vue).toBe(true);
  });

  it('템플릿 체크', () => {
    expect(vm.$el).not.toBe(null);
  });

  it('새로고침', (done) => {
    vm.$on('refresh', (o) => {
      expect(o).not.toBe(null);
      expect(o.user).not.toBe(null);
      expect(o.channelinfo).not.toBe(null);
      done();
    });

    vm.refresh();
  });

  it('메시지 표현 체크', (done) => {
    channel.on('message', (message) => {
      expect(message).not.toBe(null);
      expect(message.id).not.toBe(null);

      vm.$nextTick(() => {
        expect(vm.$el.querySelector('.x-message-list-message-box').textContent).toBe('테스트 메시지');
        done();
      });
    });

    channel.send('테스트 메시지');
  });
});
