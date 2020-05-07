import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ContentCategoriesOverview from "../views/ContentCategoriesOverview";
import About from "../views/About";
import Inspiration from "../views/Inspiration";
import MyPackages from "../views/MyPackages";
import Product from "../views/Product";
import ContentCategory from "../views/ContentCategory";
import Contact from "../views/Contact";
import Delivery from "../views/Delivery";

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
        path: '/contact',
        name: 'Contact',
        component: Contact
    },
    {
        path: '/delivery',
        name: 'Delivery',
        component: Delivery
    },
    {
        path: '/product/:productId',
        name: 'Product',
        component: Product,
        props: true
    },
    {
        path: '/contentcategoriesoverview',
        name: 'ContentCategoriesOverview',
        component: ContentCategoriesOverview
    },
    {
        path: '/category/:categoryId',
        name: 'Category',
        component: ContentCategory,
        props: true
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
