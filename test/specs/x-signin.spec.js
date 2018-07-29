import Vue from 'vue';
import XSignin from '@/src/components/x-signin/x-signin';

describe('XSignin 컴포넌트', () => {
  it('컴포넌트 설정 체크', () => {
    expect(typeof XSignin).toBe('object');
    expect(XSignin.name).toBe('XSignin');
    expect(typeof XSignin.data().email).toBe('string');
  });

  describe('인스턴스 테스트', () => {
    const vm = new Vue(XSignin).$mount();

    it('인스턴스 상태 체크', () => {
      expect(vm).not.toBe(null);
      expect(vm instanceof Vue).toBe(true);
    });

    it('템플릿 체크', () => {
      expect(vm.$el).not.toBe(null);
      expect(vm.$el.querySelector('.x-signin-logo')).not.toBe(null);
      expect(vm.$el.querySelector('.x-signin-form')).not.toBe(null);
      expect(vm.$el.querySelector('.x-signin-form-control')).not.toBe(null);
      expect(vm.$el.querySelector('.x-signin-form-control input[type="email"]')).not.toBe(null);
      expect(vm.$el.querySelector('.x-signin-buttons')).not.toBe(null);
      expect(vm.$el.querySelector('.x-signin-button')).not.toBe(null);
    });

    it('데이터 전달 체크', (done) => {
      vm.email = 'id@email';

      vm.$nextTick(() => {
        expect(vm.email).toBe('id@email');
        done();
      });
    });

    it('로그인', (done) => {
      vm.$on('signin', (session) => {
        expect(session).not.toBe(null);
        expect(session.id).not.toBe(null);
        expect(session.image).not.toBe(null);
        expect(session.email).toBe('some@email');
        done();
      });

      vm.email = 'some@email';
      vm.$nextTick(() => {
        vm.signin();
      });
    });
  });
});
