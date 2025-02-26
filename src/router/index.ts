import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Todo from "../views/Todo.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import { useUserStore } from "@/stores/userStore";

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
      component: () => import("../views/ForgotPassword.vue"),
    },

    {
      path: "/reset-password/:token",
      name: "/reset-password",
      component: () => import("../views/ResetPassword.vue"),
      props: true,
    },

    {
      path: "/todo",
      name: "Todo",
      component: Todo,
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
