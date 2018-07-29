import Vue from 'vue';
import XButton from '@/src/components/x-button/x-button';

describe('XButton 컴포넌트', () => {
  const vm = new Vue(XButton).$mount();

  it('컴포넌트 설정 체크', () => {
    expect(typeof XButton).toBe('object');
    expect(XButton.name).toBe('XButton');
  });

  it('인스턴스 상태 체크', () => {
    expect(vm).not.toBe(null);
    expect(vm instanceof Vue).toBe(true);
  });

  it('템플릿 체크', () => {
    expect(vm.$el).not.toBe(null);
    expect(vm.$el.textContent).toBe('');
  });

  it('슬롯 전달 체크', (done) => {
    const vm = new Vue({
      components: { XButton },
      template: '<x-button><i class="icon"></i> 텍스트</x-button>'
    }).$mount();

    vm.$nextTick(() => {
      expect(vm.$el.querySelector('.icon')).not.toBe(null);
      expect(vm.$el.textContent).toBe(' 텍스트');
      done();
    });
  });

  it('이벤트 - click', (done) => {
    vm.$on('click', (event) => {
      expect(event.type).toBe('click');
      done();
    });
    vm.$el.click();
  });
});
