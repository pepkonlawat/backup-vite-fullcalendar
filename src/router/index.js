import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
import MainLayout from "../layouts/MainLayout.vue";
import LoginView from "../views/auth/LogInView.vue";
import SignUpView from "../views/auth/SignUpView.vue";
import ScheduleView from "../views/main/ScheduleView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          redirect: "/schedule",
        },
        {
          path: "schedule",
          name: "schedule",
          component: ScheduleView,
        },
      ],
    },
    {
      path: "/",
      component: AuthLayout,
      children: [
        {
          path: "",
          redirect: "/login",
        },
        {
          path: "/login",
          name: "loginview",
          component: LoginView,
        },
        {
          path: "signup",
          name: "signupview",
          component: SignUpView,
        },
      ],
    },
  ],
});
// authentication guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = true; // replace with your own authentication logic
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});
export default router;
