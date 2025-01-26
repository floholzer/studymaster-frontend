import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import store from "@/store/index.js";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: 'StudyMaster' },
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue'),
        meta: { title: 'StudyMaster | About' },
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('../views/Contact.vue'),
        meta: { title: 'StudyMaster | Contact' },
    },
    {
        path: '/privacy',
        name: 'privacy',
        component: () => import('../views/Privacy.vue'),
        meta: { title: 'StudyMaster | Privacy' },
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/Profile.vue'),
        meta: { title: 'StudyMaster | Profile', requiresAuth: true },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/Login.vue'),
        meta: { title: 'StudyMaster | Login' },
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('@/components/SignUp.vue'),
        meta: { title: 'StudyMaster | Signup' },
    },
    {
        path: '/studymaster',
        name: 'studymaster',
        component: () => import('@/views/StudyMaster.vue'),
        meta: { title: 'StudyMaster | StudyMaster', requiresAuth: true },
    },
    {
        path: '/semester-management',
        name: 'semester-management',
        component: () => import('@/views/SemesterManagement.vue'),
        meta: { title: 'StudyMaster | Semester Management', requiresAuth: true },
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

// Globaler Navigation Guard
router.beforeEach((to, from, next) => {
    // Setze den Dokumenttitel
    document.title = to.meta?.title ?? 'StudyMaster';

    // Überprüfen, ob die Route eine Authentifizierung erfordert
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters['isAuthenticated']) {
            next();
        } else {
            next('/'); // Weiterleitung zur Home-Seite, wenn der Benutzer nicht authentifiziert ist
        }
    } else if (to.path === '/login' || to.path === '/signup' || to.path === '/') {
        // Überprüfen, ob der Benutzer bereits eingeloggt ist und versucht, auf die Login- oder Signup-Seite zuzugreifen
        if (store.getters['isAuthenticated']) {
            next('/studymaster'); // Weiterleitung zu einer geschützten Seite
        } else {
            next(); // Erlaube den Zugriff auf die Login- oder Signup-Seite
        }
    } else {
        next(); // Erlaube den Zugriff auf die Route
    }
});

export default router;