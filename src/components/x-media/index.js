import Vue from 'vue';
import wrapper from '@vue/web-component-wrapper';
import Component from './x-media.vue';

const CustomElement = wrapper(Vue, Component);
window.customElements.define('x-media', CustomElement);

export default Component;
