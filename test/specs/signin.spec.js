import Vue from 'vue';
import Button from '@/src/components/button';

describe('Button', () => {
  it('has a created hook', () => {
    expect(Button.name).toBe('Button');
  });

  it('sets the correct default data', () => {
    expect(typeof Button.data).toBe('function');
    const data = Button.data();
    expect(data.showSlot).toBe(true);
  });

  it('인스턴스 생성',()=>{
    const vm = new Vue(Button).$mount();
    expect(vm).not.toBe(null);
  });
})
