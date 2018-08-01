import Vue from 'vue';
import VueCustomElement from 'vue-custom-element';
import XMedia from './x-media.vue';

!Vue.customElement && Vue.use(VueCustomElement);
Vue.customElement('x-media', XMedia);

export default XMedia;
