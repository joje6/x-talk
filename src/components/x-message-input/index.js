import Vue from 'vue';
import VueCustomElement from 'vue-custom-element';
import XMessageInput from './x-message-input.vue';

!Vue.customElement && Vue.use(VueCustomElement);
Vue.customElement('x-message-input', XMessageInput);

export default XMessageInput;
