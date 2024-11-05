import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
    {path: '/', name: 'home', component: HomeView}, // Route für Home-Seite
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {title: 'StudyMaster'},
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue'),
            meta: {title: 'StudyMaster | About'},
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('../views/Contact.vue'),
            meta: {title: 'StudyMaster | Contact'},
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: () => import('../views/Privacy.vue'),
            meta: {title: 'StudyMaster | Privacy'},
        }
    ]
})

router.beforeEach((to, from) => {
    document.title = to.meta?.title ?? 'StudyMaster'
})

export default router
