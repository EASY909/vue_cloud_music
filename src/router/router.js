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
              name: "recommendAlbum",
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
          component: () => import("../views/Singers"),
          children: [
            {
              path: "/singers/:id",
              name: "Singer",
              meta: {
                keepAlive: true // 需要缓存
              },
              component: () => import("../views/Singer")
            }
          ]
        },
        {
          path: "/rank",
          name: "Rank",
          meta: {
            keepAlive: true // 不需要缓存
          },
          component: () => import("../views/Rank"),
          children: [
            {
              path: "/rank/:id",
              name: "rankAlbum",
              meta: {
                keepAlive: true // 需要缓存
              },
              component: () => import("../views/Album")
            }
          ]
        },
        {
          path: "/search",
          name: "Search",
          meta: {
            keepAlive: true // 不需要缓存
          },
          component: () => import("../views/Search")
        },
      ]
    },
  ]
});
