import Vue from 'vue'
//import App from './App.vue'
import Cal from './Cal.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import VueRouter from 'vue-router'
import MonthPicker from 'vue-month-picker'
import NotFound from './components/NotFound.vue'

Vue.use(BootstrapVue)
Vue.use(MonthPicker)
Vue.config.productionTip = false

///////////////////////////////////////////////////////
/*
new Vue({
  render: h => h(App),
}).$mount('#app')

new Vue({
  el: '#cal',
  render: h => h(Cal)
}).$mount('#cal') */
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////

const routes = {
  '/pcb': Cal
}

new Vue ({
  el: '#cal',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent() {
      if(window.location.pathname == '/'){
        window.location.pathname = '/pcb'
      }
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
  //render: h => h(this.ViewComponent)
})
//////////////////////////////////////////////////////////////
// I never use vue router even though it is possible because it will add # sign at the end of the url
