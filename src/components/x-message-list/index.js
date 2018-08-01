import Vue from 'vue';
import VueCustomElement from 'vue-custom-element';
import XMessageList from './x-message-list.vue';

!Vue.customElement && Vue.use(VueCustomElement);
Vue.customElement('x-message-list', XMessageList);

export default XMessageList;
