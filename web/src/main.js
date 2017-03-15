import Vue from 'vue'
import App from './App.vue'
// import VueMaterial from 'vue-material'
import VueMaterials from 'vue-materials'
import VueFire from 'vuefire'

Vue.use(VueMaterials);
Vue.use(VueFire);

new Vue({
  el: '#app',
  render: h => h(App)
})
