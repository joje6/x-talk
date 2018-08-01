import Vue from 'vue';
import VueCustomElement from 'vue-custom-element';
import XChannels from './x-channels.vue';

!Vue.customElement && Vue.use(VueCustomElement);
Vue.customElement('x-channels', XChannels);

export default XChannels;
