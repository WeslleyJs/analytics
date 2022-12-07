import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home';
import User from './pages/User';
import Login from './pages/Login';
import Mlb from './pages/Mlb';
import Dashboard from './pages/Dashboard';

const routes = [{
        path:'/',
        name: 'home',
        component: Home
    },
    {
        path:'/register',
        name: 'user',
        component: User
    },
    {
        path:'/login',
        name: 'login',
        component: Login
    },
    {
        path:'/itens/analytics',
        name:'itens',
        component: Mlb
    },
    {
        path:'/:catchAll(.*)',
        name: 'NotFound',
        redirect: '/',
        meta: {
            requiresAuth: false
        }
    },
    {
        path:'/dashboard',
        name: 'dashboard',
        component: Dashboard
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes:routes
});

export default router;