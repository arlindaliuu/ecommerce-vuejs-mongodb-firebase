import { createRouter, createWebHistory } from "vue-router";
import {auth} from '../firebase';


const routes = [
    {
      name: 'home',
      path: '/',
      component: () => import('../views/Home.vue'),
      meta: { title: 'Ballina' }
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('../views/Register.vue')
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
      name: 'login',
      path: '/login',
      component: () => import('../views/Login.vue'),
      meta: { title: 'Kycuni ne Luliflex' }
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
    {
      name: 'dashboard',
      path: '/dashboard',
      component: () => import('../views/dashboard/dashboard.vue')
    },
    {
      name: 'dashboardd',
      path: '/dashboardd',
      children: [
        {
          name: 'product',
          path: 'product',
          children: [
            {
              name: 'product-create',
              path: 'create',
              component: () => import(/* webpackChunkName: "product-create" */'../views/dashboard/product/ProductCreate.vue')
            },
            {
              name: 'product-list',
              path: 'list',
              component: () => import(/* webpackChunkName: "product-list" */ '../views/dashboard/product/ProductList.vue')
            },
            {
              name: 'product-edit',
              path: '/edit/:id',
              component: () => import(/* webpackChunkName: "product-edit" */ '../views/dashboard/product/ProductEdit.vue')
            }
          ]
        }
      ]
    }
  ]
  

const router = createRouter({
        history: createWebHistory(),
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
    if(to.path === '/login' && auth.currentUser){
        next('/')
        return;
    }
    if(!flattenRoutes(routes).includes(to.name)){
            next('/404')
    }
    if(to.matched.some(record => record.meta.requiresAdmin) && (!auth.currentUser || !auth.currentUser.isAdmin)){
        next('/')
        return;
    }


    const isAdmin = JSON.stringify(localStorage.getItem('isAdmin'));


        //redirect non-admin users from the dashboard route
    if (to.path === '/dashboard' && !isAdmin) {
        next('/')
        return;
    }
    next();
})

export default router