import { createRouter, createWebHistory } from "vue-router";
import {auth} from '../firebase';

    const routes = [
        {path: '/', component: () => import('../views/Home.vue'), meta:{ requiresAuth: true}},
        {path: '/register', component: () => import('../views/Register.vue')},
        {path: '/about', component: () => import('../views/AboutUs.vue'), meta:{ requiresAuth: true}},
        {path: '/login', component: () => import('../views/Login.vue')},
        {path: '/404', component: () => import('../views/404.vue')}
        

    ]
const router = createRouter({
        history: createWebHistory(),
        routes
});

// router.beforeEach((to, from, next) =>{
//     if(to.path === '/login' && auth.currentUser){
//         next('/')
//         return;
//     }
//     //redirect to login if user is not authenticated
//     // if(to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser){
//     //     next('/login')
//     //     return;
//     // }
//     // next();
// })
export default router