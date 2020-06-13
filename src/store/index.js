import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import Recommend from "./modules/Recommend";
export default new Vuex.Store({
  strict: true,
  modules: {
    Recommend
  }
})
