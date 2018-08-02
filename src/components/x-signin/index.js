import Vue from 'vue';
import wrapper from '@vue/web-component-wrapper';
import Component from './x-signin.vue?shadow';

const CustomElement = wrapper(Vue, Component);
window.customElements.define('x-signin', CustomElement);

export default Component;
