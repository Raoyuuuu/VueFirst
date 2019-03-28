// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import iView from 'iview'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import 'iview/dist/styles/iview.css'

// import text from '@/components/Table'


// Vue.component('text',{text});
Vue.config.productionTip = false;
Vue.use(VueAxios,axios);
Vue.use(iView);
Vue.use(Vuex)
// Vue.use(qs);


const store = new Vuex.Store({
  state: {
    user:'',
    // token: '',
    employeeList: [],
    dailyReportList: [],
    menuContent:{},
    reportContent:{},
    reportContentWeek:{},
    uriContent:{},
    title:'null',
    // departmentList: [],
  },
  mutations: {
    increment (state) {
      
    }
  }
})

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
