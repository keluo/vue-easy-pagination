import Vue from 'vue'
import App from './App.vue'
import Pagination from '../src'
Vue.use(Pagination)
new Vue({
  render: h => h(App)
}).$mount('#app')