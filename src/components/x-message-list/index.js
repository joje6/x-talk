import Vue from 'vue';
import wrapper from '@vue/web-component-wrapper';
import Component from './x-message-list.vue';

const CustomElement = wrapper(Vue, Component);
window.customElements.define('x-message-list', CustomElement);

export default Component;
