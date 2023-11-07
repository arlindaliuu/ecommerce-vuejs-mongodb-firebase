import { createRouter, createWebHistory } from "vue-router";
import PasswordReset from '@/components/PasswordReset.vue';
import Cookies from 'js-cookie';

const routes = [
    {
      name: 'home',
      path: '/',
      component: () => import('../views/Home.vue'),
      meta: { title: 'Ballina' }
    },
    {
      path: '/sitemap.xml',
      name: 'sitemap',
      component: () => import('../views/Sitemap.vue'),
    },
    {
      name: "privacy-policy",
      path:"/privacy-policy",
      component:()=>import("../views/PrivacyPolicy.vue"),
      meta:{title:'Kushtet e politikes dhe privatesise'}
    },
    {
      name: "faq",
      path:"/faq",
      component:()=>import("../views/FAQ.vue"),
      meta:{title:'Pyetjet e shpeshta'}
    },
    {
      name: 'orders',
      path: '/orders',
      component: () => import('../components/MyOrders.vue'),
      meta: { title: 'Porosite' }
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/Services.vue'),
      meta:{title:'Serviset'}
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('../views/Register.vue'),
      meta:{title:'Regjistrohu'}
    },
    {
      name: 'ProductDetails',
      path: '/products/:id',
      component: () => import('../components/ProductDetails.vue'),
      meta: { title: 'Produkti' }
    },
    {
      name: 'about',
      path: '/about',
      component: () => import('../views/AboutUs.vue'),
      meta: { title: 'Rreth Nesh' }
    },
    {
      path: '/password-reset/:token',
      name: 'password-reset',
      component: PasswordReset,
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('../views/Login.vue'),
      meta: { title: 'Kyçuni ne LULIflex' }
    },
    {
      name: '404',
      path: '/404',
      component: () => import('../views/404.vue')
    },
    {
      name: 'contactus',
      path: '/contactus',
      component: () => import('../views/ContactUs.vue'),
      meta: { title: 'Kontakti' }
    },
    {
      name: 'Shop',
      path: '/shop',
      component: () => import('../views/Shop.vue'),
      meta: { title: 'Dyqani' }
    },
    {
      name: 'Cart',
      path: '/cartitems',
      component: () => import('../views/CartItems.vue'),
      meta: { title: 'Karta' }
    },
  ]  

const router = createRouter({
        history: createWebHistory('/'),
        routes
});

function flattenRoutes(routes) {
    return routes.flatMap((route) => {
      if (Array.isArray(route.children)) {
        // recursively flatten children arrays
        return [route.name, ...flattenRoutes(route.children)];
      } else {
        return route.name;
      }
    });
  }

router.beforeEach((to, from, next) =>{
    const isLoggedIn = Cookies.get('luliflex_username');

    document.title = `${to.meta.title}`;
    if(to.path === '/login' && isLoggedIn){
        next('/')
        return;
    }
    if(!flattenRoutes(routes).includes(to.name)){
            next('/404')
    }
    if(to.matched.some(record => record.meta.requiresAdmin)){
        next('/')
        return;
    }
        //redirect non-admin users from the dashboard route
    if (to.path === '/dashboard' && !isAdmin) {
        next('/')
        return;
    }
    next();
})

export default router