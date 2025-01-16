import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user.store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { hideNavbar: false },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/certificados',
      name: 'certificados',
      component: () => import('../views/CertificadosView.vue'),
      meta: { requiresAuth: false },
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
    {
      path: '/gestionar-ausencias',
      name: 'gestionarAusencia',
      component: () => import('../views/ManageAbsencesView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/portal-rrhh',
      name: 'recursosHumanos',
      component: () => import('../views/PortalRRHHView.vue'),
      meta: { requiresAuth: false },
      children: [
        { path: '', redirect: 'portal-rrhh/gestionar-empleados' },
        { path: 'gestionar-empleados', component: () => import('../views/PortalRRHH/manageEmployeesView.vue') },
        { path: 'gestionar-cumplimientos', component: () => import('../views/PortalRRHH/manageComplienceView.vue') },
        { path: 'gestionar-pausas', component: () => import('../views/PortalRRHH/manageActiveBreak.vue') },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'ErrorView',
      meta: { requiresAuth: false, hideNavbar: true },
      component: () => import('../views/Error.vue'),
    }
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
