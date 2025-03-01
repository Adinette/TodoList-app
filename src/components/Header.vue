<script setup lang="ts">
import { useUserStore } from "../stores/user-store";
import { useSignOutApi } from "../api/auth-api"
import { ref } from "vue";

const userStore = useUserStore();
userStore.initializeAuth();

const { mutate: logout } = useSignOutApi();

const handleLogout = () => {
  logout(undefined, {
    onSuccess: () => {
      userStore.clearUser();
    },
    onError: (error) => {
      console.error("Erreur lors de la déconnexion :", error);
    },
  });
};

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="bg-[#0060bf] text-white fixed z-30 w-full">
    <div
      class="container flex items-center bg-[#0060bf] p-4 justify-between h-16 mx-auto md:justify-center md:space-x-3">
      <ul v-if="userStore.isAuthenticated" class="items-stretch hidden md:flex">
        <li class="flex">
          <router-link to="/task-list" class="flex items-center px-3 -mb-1 font-semibold text-xl text-ellipsis whitespace-nowrap">Mes
            tâches</router-link>
        </li>
        <li class="flex">
          <router-link to="/task-dashboard" class="flex items-center px-3 -mb-1 font-semibold text-xl text-ellipsis whitespace-nowrap">Tableau de
            bord</router-link>
        </li>
      </ul>
      <router-link to="/" aria-label="Back to homepage"
        class="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full dark:bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor"
          class="w-5 h-5 rounded-full dark:text-[#0060bf]">
          <path
            d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z">
          </path>
        </svg>
      </router-link>
      <ul class="items-stretch hidden space-x-3 md:flex">
        <li v-if="userStore.isAuthenticated" class="flex">
          <router-link to="/task-form" class="flex items-center px-4 -mb-1 font-semibold text-xl text-ellipsis whitespace-nowrap">Ajouter une
            tache</router-link>
        </li>
        <li v-if="!userStore.isAuthenticated" class="flex">
          <router-link to="/login" type="button"
            class="px-3 py-2 font-semibold text-xl rounded dark:bg-white dark:text-[#0060bf]">
            Continuer vers l'app
          </router-link>
        </li>

        <li v-else class="flex">
          <button @click="handleLogout" type="button"
            class="px-3 py-2 font-semibold text-xl rounded dark:bg-white dark:text-[#0060bf]">
            Déconnexion
          </button>
        </li>
      </ul>
      <button @click="toggleMenu" title="Button" type="button" class="flex items-center justify-center text-center md:hidden w-12 h-12 bg-white rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 dark:text-[#0060bf]">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
    <!-- Menu déroulant pour mobile -->
  <div v-if="isMenuOpen" class="md:hidden bg-[#0060bf] text-white p-4">
    <ul>
      <li v-if="userStore.isAuthenticated" class="py-2">
        <router-link to="/task-list" class="block px-4 py-2 font-semibold text-xl text-ellipsis whitespace-nowrap">Mes tâches</router-link>
      </li>
      <li v-if="userStore.isAuthenticated" class="py-2">
        <router-link to="/task-dashboard" class="block px-4 py-2 font-semibold text-xl text-ellipsis whitespace-nowrap">Tableau de bord</router-link>
      </li>
      <li v-if="userStore.isAuthenticated" class="py-2">
        <router-link to="/task-form" class="block px-4 py-2 font-semibold text-xl text-ellipsis whitespace-nowrap">Ajouter une tâche</router-link>
      </li>
      <li v-if="!userStore.isAuthenticated" class="py-2">
        <router-link to="/login" type="button" class="block px-4 py-2 font-semibold text-xl rounded dark:bg-white dark:text-[#0060bf]">
          Continuer vers l'app
        </router-link>
      </li>
      <li v-else class="ml-3 py-2">
        <button @click="handleLogout" type="button" class="block px-4 py-2 font-semibold text-xl rounded dark:bg-white dark:text-[#0060bf]">
          Déconnexion
        </button>
      </li>
    </ul>
  </div>
  </div>
</template>

<style scoped></style>
