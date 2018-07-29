import Vue from 'vue';
import connect from 'x-talk-connect';
import XMessageInput from '@/src/components/x-message-input/x-message-input';

describe('XMessageInput 컴포넌트', () => {
  const vm = new Vue(XMessageInput).$mount();
  let channel;

  beforeAll((done) => {
    (async () => {
      channel = await connect.create({
        title: '테스트 채널'
      });
      Vue.set(vm, 'channelid', channel.id);
      done();
    })();
  });

  it('컴포넌트 설정 체크', () => {
    expect(typeof XMessageInput).toBe('object');
    expect(XMessageInput.name).toBe('XMessageInput');
    expect(typeof XMessageInput.data().message).toBe('string');
  });

  it('인스턴스 상태 체크', () => {
    expect(vm).not.toBe(null);
    expect(vm instanceof Vue).toBe(true);
  });

  it('템플릿 체크', () => {
    expect(vm.$el).not.toBe(null);
    expect(vm.$el.querySelector('.x-message-input-box')).not.toBe(null);
    expect(vm.$el.querySelector('.x-message-input-file')).not.toBe(null);
    expect(vm.$el.querySelector('.x-message-input-button')).not.toBe(null);
  });

  it('데이터 전달 체크', (done) => {
    vm.message = '테스트 메시지';

    vm.$nextTick(() => {
      expect(vm.message).toBe('테스트 메시지');
      done();
    });
  });

  it('메시지 전송', (done) => {
    vm.$on('send', (message) => {
      expect(message).toBe('메시지 테스트');
      done();
    });

    vm.$on('senderror', (error) => {
      fail(error.message);
      done();
    });

    vm.message = '메시지 테스트';
    vm.$nextTick(() => {
      vm.send();
    });
  });
});
