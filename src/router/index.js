import { createRouter, createWebHistory } from "vue-router";
import {auth} from '../firebase';

    const routes = [
        {path: '/', component: () => import('../views/Home.vue'), meta:{ requiresAuth: true}},
        {path: '/register', component: () => import('../views/Register.vue')},
        {path: '/feed', component: () => import('../views/Feed.vue'), meta:{ requiresAuth: false}},
        {path: '/login', component: () => import('../views/Login.vue')}

    ]
const router = createRouter({
        history: createWebHistory(),
        routes
});

router.beforeEach((to, from, next) =>{
    if(to.path === '/login' && auth.currentUser){
        next('/')
        return;
    }
    if(to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser){
        next('/login')
        return;
    }
    next();
})
export default router