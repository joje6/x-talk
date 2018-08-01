import Vue from 'vue';
import VueCustomElement from 'vue-custom-element';
import XSignin from './x-signin.vue';

!Vue.customElement && Vue.use(VueCustomElement);
Vue.customElement('x-signin', XSignin);

export default XSignin;
