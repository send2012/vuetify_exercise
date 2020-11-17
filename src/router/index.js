import Vue       from 'vue';
import VueRouter from 'vue-router';

Vue.use( VueRouter );

const routes = [
    {
        path     : '/',
        name     : 'Home',
        component: () => import( '@/views/home/' ),
    },
    {
        path     : '/about',
        name     : 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '@/views/about/' ),
    },
    {
        path     : '/bottom-navigation',
        name     : 'bottom_navigation',
        component: () => import( /* webpackChunkName: "bottom_navigation" */ '@/views/bottom_navigation/' ),
    },
    {
        path     : '/buttons',
        name     : 'buttons',
        component: () => import( /* webpackChunkName: "buttons" */ '@/views/buttons/' ),
    },
];

const router = new VueRouter( {
    routes,
} );

export default router;
