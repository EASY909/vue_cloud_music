import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Recommend from "../views/Recommend";
import Singers from "../views/Singers";
import Rank from "../views/Rank"
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      redirect:"/recommend",
      component: Home,
      children: [
        {
          path: "/recommend",
          name: "Recommend",
          component: Recommend
        },
        {
          path: "/singers",
          name: "Singers",
          component: Singers
        },
        {
          path: "/rank",
          name: "Rank",
          component: Rank
        },
      ]
    },

  ]
});
