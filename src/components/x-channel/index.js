import Vue from 'vue';
import wrapper from '@vue/web-component-wrapper';
import Component from './x-channel.vue';

const CustomElement = wrapper(Vue, Component);
window.customElements.define('x-channel', CustomElement);

export default Component;
