import Vue from 'vue';
import XMedia from '@/src/components/x-media/x-media';

describe('XMedia 컴포넌트', () => {
  const vm = new Vue(XMedia).$mount();

  it('컴포넌트 설정 체크', () => {
    expect(typeof XMedia).toBe('object');
    expect(XMedia.name).toBe('XMedia');
    expect(typeof XMedia.props.title.default).toBe('string');
    expect(typeof XMedia.props.thumbnail.default).toBe('string');
  });

  it('인스턴스 상태 체크', () => {
    expect(vm).not.toBe(null);
    expect(vm instanceof Vue).toBe(true);
  });

  it('템플릿 체크', () => {
    expect(vm.$el).not.toBe(null);
    expect(vm.$el.querySelector('.x-media-left')).not.toBe(null);
    expect(vm.$el.querySelector('.x-media-body')).not.toBe(null);
    expect(vm.$el.querySelector('.x-media-heading')).not.toBe(null);
    expect(vm.$el.querySelector('.x-media-right')).not.toBe(null);
  });

  it('기본 프러퍼티 체크', () => {
    expect(vm.title).toBe(XMedia.props.title.default);
    expect(vm.thumbnail).toBe(XMedia.props.thumbnail.default);
  });

  it('프러퍼티 전달 체크', (done) => {
    const vm = new Vue({
      components: { XMedia },
      template: '<x-media title="테스트 제목" thumbnail="thumbnail"></x-media>'
    }).$mount();

    vm.$nextTick(() => {
      expect(vm.$el.querySelector('.x-media-heading').textContent).toBe('테스트 제목');
      expect(vm.$el.querySelector('.x-media-image').style.backgroundImage).toBe('url("thumbnail")');
      done();
    });
  });
});
