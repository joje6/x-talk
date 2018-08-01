import Vue from 'vue';
import VueCustomElement from 'vue-custom-element';
import XChannel from './x-channel.vue';

!Vue.customElement && Vue.use(VueCustomElement);
Vue.customElement('x-channel', XChannel);

export default XChannel;
