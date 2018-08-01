import Vue from 'vue';
import VueCustomElement from 'vue-custom-element';
import XTitlebar from './x-titlebar.vue';

!Vue.customElement && Vue.use(VueCustomElement);
Vue.customElement('x-titlebar', XTitlebar);

export default XTitlebar;
