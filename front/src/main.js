import Vue from 'vue'
import './plugins/vuetify'
import store from './plugins/vuex'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
