import Vue from 'vue';
import XTitlebar from '@/src/components/x-titlebar/x-titlebar';

describe('XTitlebar 컴포넌트', () => {
  it('컴포넌트 설정 체크', () => {
    expect(typeof XTitlebar).toBe('object');
    expect(XTitlebar.name).toBe('XTitlebar');
  });

  describe('인스턴스 테스트', () => {
    const vm = new Vue(XTitlebar).$mount();

    it('인스턴스 상태 체크', () => {
      expect(vm).not.toBe(null);
      expect(vm instanceof Vue).toBe(true);
    });

    it('템플릿 체크', () => {
      expect(vm.$el).not.toBe(null);
      expect(vm.$el.querySelector('.x-titlebar-left')).not.toBe(null);
      expect(vm.$el.querySelector('.x-titlebar-center')).not.toBe(null);
      expect(vm.$el.querySelector('.x-titlebar-right')).not.toBe(null);
    });

    it('슬롯 전달 체크', (done) => {
      const vm = new Vue({
        components: { XTitlebar },
        template: '<x-titlebar>\
        <span slot="left">left</span>\
        <span slot="center">center</span>\
        <span slot="right">right</span>\
        </x-titlebar>'
      }).$mount();

      vm.$nextTick(() => {
        expect(vm.$el.querySelector('.x-titlebar-left > span').textContent).toBe('left');
        expect(vm.$el.querySelector('.x-titlebar-center > span').textContent).toBe('center');
        expect(vm.$el.querySelector('.x-titlebar-right > span').textContent).toBe('right');
        done();
      });
    });
  });
});
