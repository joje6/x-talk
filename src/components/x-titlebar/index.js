import Vue from 'vue';
import wrapper from '@vue/web-component-wrapper';
import Component from './x-titlebar.vue';

const CustomElement = wrapper(Vue, Component);
window.customElements.define('x-titlebar', CustomElement);

export default Component;
