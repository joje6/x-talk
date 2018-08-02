import Vue from 'vue';
import wrapper from '@vue/web-component-wrapper';
import Component from './x-button.vue';

const CustomElement = wrapper(Vue, Component);
window.customElements.define('x-button', CustomElement);

export default Component;
