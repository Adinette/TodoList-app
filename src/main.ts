import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { useUserStore } from './stores/user-store';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);

const queryClient = new QueryClient();

app.use(VueQueryPlugin, { queryClient });

const userStore = useUserStore();
userStore.initializeAuth();
console.log(userStore.isAuthenticated);

app.use(router);

app.mount('#app');
