import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user.store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { hideNavbar: true },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/certificados',
      name: 'certificados',
      component: () => import('../views/CertificadosView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/perfil',
      component: () => import('../views/ProfileView.vue'),
      children: [
        { path: '', redirect: 'perfil/informacion-personal' },
        { path: 'informacion-personal', component: () => import('../views/InformacionPersonalView.vue') },
        { path: 'informacion-profesional', component: () => import('../views/InformacionProfesionalView.vue') },
        { path: 'tiempo-libre', component: () => import('../views/TiempoLibreView.vue') },
        { path: 'informacion-salarial', component: () => import('../views/TiempoLibreView.vue') },
      ],
    },
    {
      path: '/solicitar-ausencia',
      name: 'solicitarAusencia',
      component: () => import('../views/AbsenceRequestView.vue'),
      meta: { requiresAuth: false },
    },
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth) {
    if (!userStore.isAuthenticated) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
