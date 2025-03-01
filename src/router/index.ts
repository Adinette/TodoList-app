import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import TaskList from "../views/task/Task-list.vue";
import TaskDashboard from "../views/task/Task-dashboard.vue";
import TaskForm from "../views/task/Task-form.vue/";
import Register from "../views/auth/Register.vue";
import Login from "../views/auth/Login.vue";
import { useUserStore } from "../stores/user-store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },

    {
      path: "/forgot-password",
      name: "forgot-password",
      component: () => import("../views/auth/Forgot-password.vue"),
    },

    {
      path: "/reset-password/:token",
      name: "/reset-password",
      component: () => import("../views/auth/Reset-password.vue"),
      props: true,
    },
    {
      path: "/task-list",
      name: "TaskList",
      component: TaskList,
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        if (userStore.token) {
        }else{
          userStore.token = localStorage.getItem("token");
        }
        userStore.checkTokenExpiration();

        if (!userStore.isAuthenticated) {
          next({ name: "login" });
        } else {
          next();
        }
      },
    },
    {
      path: "/task-dashboard",
      name: "TaskDashboard",
      component: TaskDashboard,
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        if (userStore.token) {
        }else{
          userStore.token = localStorage.getItem("token");
        }
        userStore.checkTokenExpiration();

        if (!userStore.isAuthenticated) {
          next({ name: "login" });
        } else {
          next();
        }
      },
    },
    {
      path: "/task-form/:id?",
      name: "TaskForm",
      component: TaskForm,
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        if (userStore.token) {
        }else{
          userStore.token = localStorage.getItem("token");
        }
        userStore.checkTokenExpiration();

        if (!userStore.isAuthenticated) {
          next({ name: "login" });
        } else {
          next();
        }
      },
    },
  ],
});
export default router;
