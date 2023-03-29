import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import "./assets/css/app.css"

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  store: store,
  router: router,
  render: h => h(App),
}).$mount('#app')
