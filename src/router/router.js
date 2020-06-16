import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/recommend",
      component: Home,
      children: [
        {
          path: "/recommend",
          name: "Recommend",
          meta: {
            keepAlive: true // 需要缓存
          },
          component: () => import("../views/Recommend"),
          children: [
            {
              path: "/recommend/:id",
              name: "Album",
              meta: {
                keepAlive: true // 需要缓存
              },
              component: () => import("../views/Album")
            }
          ]
        },
        {
          path: "/singers",
          name: "Singers",
          meta: {
            keepAlive: true // 需要缓存
          },
          component: () => import("../views/Singers")
        },
        {
          path: "/rank",
          name: "Rank",
          meta: {
            keepAlive: true // 不需要缓存
          },
          component: () => import("../views/Rank")
        },
      ]
    },

  ]
});
