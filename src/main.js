import "material-design-icons-iconfont/dist/material-design-icons.css";

import Vue from "vue";
import App from "./App.vue";

import BootstrapVue from "bootstrap-vue";

import Vuetify from "vuetify";

Vue.use(BootstrapVue);
Vue.use(Vuetify, {
  iconfont: "md"
});
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
  vuetify: new Vuetify()
});
