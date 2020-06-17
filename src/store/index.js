import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import Recommend from "./modules/Recommend";
import Singers from "./modules/Singers";
import Rank from "./modules/Rank";
import Album from "./modules/Album"
export default new Vuex.Store({
  strict: true,
  modules: {
    Recommend,
    Singers,
    Rank,
    Album
  }
})
