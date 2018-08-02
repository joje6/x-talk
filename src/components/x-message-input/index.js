import Vue from 'vue';
import wrapper from '@vue/web-component-wrapper';
import Component from './x-message-input.vue';

const CustomElement = wrapper(Vue, Component);
window.customElements.define('x-message-input', CustomElement);

export default Component;
