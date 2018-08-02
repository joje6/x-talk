import Vue from 'vue';
import wrapper from '@vue/web-component-wrapper';
import Component from './x-channels.vue';

const CustomElement = wrapper(Vue, Component);
window.customElements.define('x-channels', CustomElement);

export default Component;
