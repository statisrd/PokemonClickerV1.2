import Vue from 'vue' // /dist/vue.esm.js без этого vue.component не работает
import App from './App.vue'
import vuetify from './plugins/vuetify'

import './scss/mixins.scss'

import store from './store';


Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


