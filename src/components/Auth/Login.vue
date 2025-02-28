<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSignInApi } from '../../api/auth-api';
import InputText from '../Form/InputText.vue';
import InputPassword from '../Form/InputPassword.vue';
import Form from '../Form/Form.vue';

const route = useRoute();
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMessage = ref('');

onMounted(() => {
  const token = route.query.token as string;
  if (typeof token === 'string') {
    localStorage.setItem("authToken", token);
    router.push("/task-list")
  }
})

const resetForm = () => {
  email.value = '';
  password.value = '';
};

const { mutateAsync: userLogin } = useSignInApi();

const submitForm = async () => {
  try {
    errorMessage.value = '';
    const credentials = {
      email: email.value,
      password: password.value,
    };
    const response = await userLogin(credentials);
    if (response && response?.data?.token) {
      localStorage.setItem('authToken', response.data.token);
      router.push('/task-list');
    } else {
      errorMessage.value = "Email ou mot de passe incorrect.";
    }
  } catch (error) {
    errorMessage.value = "Échec de la connexion.";
    throw error;
  };
  resetForm();
};
</script>

<template>
  <div>
    <Form @submit.prevent="submitForm" class="container flex flex-col mx-auto space-y-12">
      <div class="">
        <InputText class="my-8" id="email" type="email" name="email" placeholder="Email" v-model="email" requiredW>
        </InputText>
        <InputPassword :id="password" :name="password" :type="password" placeholder="Password" v-model="password"></InputPassword>
      </div>
      <div class="text-center">
        <div class="mb-4">
          <a href="/forgot-password" class="text-lg font-medium text-white underline">
            Mot de passe oublié ?
          </a>
        </div>
        <div class="mb-5">
          <button type="submit"
            class="px-3 py-2 font-semibold text-xl rounded-xl dark:bg-white dark:text-[#0060bf] w-full">
            Se connecter
          </button>
        </div>
        <div class="my-5 flex items-center justify-center">
          <p class="text-lg font-medium text-white">Pas de compte? </p>
          <a href="/register" class="ml-2 text-lg font-medium text-white underline">
            Inscrivez-vous
          </a>
        </div>
      </div>
    </Form>
  </div>
</template>
