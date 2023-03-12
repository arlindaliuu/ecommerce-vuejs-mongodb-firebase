import { createRouter, createWebHistory } from "vue-router";
import {auth} from '../firebase';


    const routes = [
        {name: 'home', path: '/', component: () => import('../views/Home.vue'), meta:{ requiresAuth: true}},
        {name: 'register', path: '/register', component: () => import('../views/Register.vue')},
        {name: 'about', path: '/about', component: () => import('../views/AboutUs.vue'), meta:{ requiresAuth: true}},
        {name: 'login', path: '/login', component: () => import('../views/Login.vue')},
        {name: '404', path: '/404', component: () => import('../views/404.vue')},
        {name: 'dashboard', path: '/dashboard',  component: () => import('../views/dashboard/dashboard.vue')},
        {name: 'dashboardd', path: '/dashboardd', children:[
            {name: 'product',
             path: 'product',
            children:[
                        {
                            name:'product-create',
                            path: 'create',
                            component: () => import(
            
                                /* webpackChunkName: "post-create" */ '../views/dashboard/product/ProductCreate.vue',
                            )
                        },
                        {
                            name:'product-list',
                            path: 'list',
                            component: () => import(
                                /* webpackChunkName: "post-create" */ '../views/dashboard/product/ProductList.vue',
                            )
                        }
                ]
            }
        ]}

    ]

const router = createRouter({
        history: createWebHistory(),
        routes
});
// const routesNames = routes.flatMap((route) => route.children ? route.children.flatMap((route) => route.name).concat(route.name): route.name);
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
  console.log(flattenRoutes(routes));

router.beforeEach((to, from, next) =>{
    if(to.path === '/login' && auth.currentUser){
        next('/')
        return;
    }
    if(!flattenRoutes(routes).includes(to.name)){
            next('/404')
    }
    //redirect to login if user is not authenticated
    if(to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser){
        next('/login')
        return;
    }
    next();
})

export default router