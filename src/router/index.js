import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ContentCategoriesOverview from "../views/ContentCategoriesOverview";
import About from "../views/About";
import Inspiration from "../views/Inspiration";
import MyPackages from "../views/MyPackages";
import Wrapping from "../views/Wrapping";

Vue.use(VueRouter);

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/inspiration',
      name: 'Inspiration',
      component: Inspiration
    },
    {
      path: '/wrapping',
      name: 'Wrapping',
      component: Wrapping
    },
    {
      path: '/contentcategoriesoverview',
      name: 'ContentCategoriesOverview',
      component: ContentCategoriesOverview
    },
    {
      path: '/mypackages',
      name: 'MyPackages',
      component: MyPackages
    },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
