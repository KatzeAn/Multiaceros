import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user.store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: { hideNavbar: true },
    },
    {
      path: "/resetpassword",
      name: "resetpassword",
      component: () => import("../views/ResetPasswordView.vue"),
      meta: { hideNavbar: true },
    },
    {
      path: "/applications",
      name: "Applications",
      component: () => import("../views/Applications.vue"),
      meta: { hideNavbar: true, hideSidebar: true },
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/certificados",
      name: "certificados",
      component: () => import("../views/CertificadosView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/perfil",
      component: () => import("../views/ProfileView.vue"),
      children: [
        { path: "", redirect: "perfil/informacion-personal" },
        {
          path: "informacion-personal",
          component: () => import("../views/InformacionPersonalView.vue"),
        },
        {
          path: "informacion-profesional",
          component: () => import("../views/InformacionProfesionalView.vue"),
        },
        {
          path: "tiempo-libre",
          component: () => import("../views/TiempoLibreView.vue"),
        },
        {
          path: "informacion-salarial",
          component: () => import("../views/TiempoLibreView.vue"),
        },
      ],
    },

    {
      path: "/ausencias",
      component: () => import("../views/AbsenceRequestView.vue"),
      children: [
        { path: "", redirect: "/ausencias/solicitar-ausencia" },
        {
          path: "solicitar-ausencia",
          component: () => import("../views/AbsenceRequestView.vue"),
        },
        {
          path: "mis-ausencias",
          component: () => import("../views/InformacionProfesionalView.vue"),
        },
      ],
    },
    {
      path: '/nomina/comprobantes',
      name: 'ComprobantesPago',
      component: () => import("../views/PayrollView.vue"),
    },

    {
      path: "/portal-rrhh",
      name: "recursosHumanos",
      component: () => import("../views/PortalRRHHView.vue"),
      meta: { requiresAuth: false },
      children: [
        {
          path: "gestionar-vacantes",
          component: () => import("../views/PortalRRHH/ManageApplications.vue"),
        },
        {
          path: "gestionar-ausencias",
          component: () =>
            import(
              "../components/ManageAbsenceComponents/StatisticsAbsencesCard.vue"
            ),
        },
        {
          path: '/portal-rrhh/gestionar-beneficios',
          name: 'GestionBeneficios',
          component: () => import("../views/VacancyManagementView.vue"),
        }
      ],
    },

    {
      path: "/portal-rrhh/empleados",
      component: () => import("../views/PortalRRHH/manageEmployee.vue"),
      children: [
        { path: "", redirect: "/portal-rrhh/empleados/gestionar-empleados" },
        {
          path: "gestionar-empleados",
          name: "manageEmployee",
          component: () =>
            import(
              "../views/PortalRRHH/manageEmployee/manageEmployeesView.vue"
            ),
        },
        
        {
          path: "gestionar-departamentos",
          component: () =>
            import(
              "../views/PortalRRHH/manageEmployee/manageDepartmentsView.vue"
            ),
        },
        {
          path: "gestionar-cargos",
          component: () =>
            import(
              "../views/PortalRRHH/manageEmployee/manageJobTitlesView.vue"
            ),
        },
        {
          path: "gestionar-eps",
          component: () =>
            import("../views/PortalRRHH/manageEmployee/manageEpsView.vue"),
        },
        {
          path: "gestionar-arl",
          component: () =>
            import("../views/PortalRRHH/manageEmployee/manageArlView.vue"),
        },
        {
          path: "gestionar-fondos-pension",
          component: () =>
            import(
              "../views/PortalRRHH/manageEmployee/managePensionFundView.vue"
            ),
        },
        {
          path: "gestionar-fondos-compensacion",
          component: () =>
            import(
              "../views/PortalRRHH/manageEmployee/manageFamilyCompensationFundView.vue"
            ),
        },
        {
          path: "gestionar-fondos-cesantias",
          component: () =>
            import(
              "../views/PortalRRHH/manageEmployee/manageSeveranceFundView.vue"
            ),
        },
        {
          path: "gestionar-beneficios",
          component: () =>
            import(
              "../views/PortalRRHH/manageEmployee/manageBenefitView.vue"
            ),
        },
      ],
    },

    {
      path: "/portal-rrhh/aplicaciones",
      component: () => import("../views/PortalRRHH/manageApplications.view.vue"),
      children: [
        { path: "", redirect: "/portal-rrhh/aplicaciones/gestionar-candidatos" },
        {
          path: "gestionar-candidatos",
          name: "manageApplicants",
          component: () =>
            import(
              "../views/PortalRRHH/manageApplications/manageApplicants.view.vue"
            ),
        },
      ],
    },

    {
      path: "/:pathMatch(.*)*",
      name: "ErrorView",
      meta: { requiresAuth: false, hideNavbar: true },
      component: () => import("../views/Error.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // Si la ruta requiere autenticación y el usuario no está autenticado, redirigir al login
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({ name: "login" });
  }
  // En cualquier otro caso, permitir la navegación
  else {
    next();
  }
});

export default router;
