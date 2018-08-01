import Vue from 'vue';
import VueCustomElement from 'vue-custom-element';
import XButton from './x-button.vue';

!Vue.customElement && Vue.use(VueCustomElement);
Vue.customElement('x-button', XButton);

export default XButton;
