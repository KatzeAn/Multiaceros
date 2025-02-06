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
      path: "/applications",
      name: "Applications",
      component: () => import('../views/Applications.vue'),
      meta: { hideNavbar: true, hideSidebar: true },
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
      path: '/ausencias',
      component: () => import('../views/AbsenceRequestView.vue'),
      children: [
        { path: '', redirect: '/ausencias/solicitar-ausencia' },
        { path: 'solicitar-ausencia', component: () => import('../views/AbsenceRequestView.vue') },
        { path: 'mis-ausencias', component: () => import('../views/InformacionProfesionalView.vue') },
      ],
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
        { path: 'gestionar-vacantes', component: () => import('../views/PortalRRHH/ManageApplications.vue') },
        { path: 'gestionar-ausencias', component: () => import('../components/ManageAbsenceComponents/StatisticsAbsencesCard.vue') },

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
  
  // Si la ruta requiere autenticación y el usuario no está autenticado, redirigir al login
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({ name: 'login' });
  } 
  // En cualquier otro caso, permitir la navegación
  else {
    next();
  }
});

export default router
