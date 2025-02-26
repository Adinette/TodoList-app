<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCreateUserApi } from '@/api/user-api';
import InputText from '../Form/InputText.vue';
import InputPassword from '../Form/InputPassword.vue';
import Form from '../Form/Form.vue';

const route = useRoute();
const router = useRouter();


const username = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');

onMounted(() => {
  const token = route.query.token;
  if (token) {
    localStorage.setItem("authToken", token);
    router.push("/todo")
    console.log("Utilisateur connecté avec un token valide !");
  }
})

const resetForm = () => {
  username.value = '';
  email.value = '';
  password.value = '';
};

const { mutateAsync: createUser } = useCreateUserApi();

const submitForm = async () => {
  try {
    errorMessage.value = '';

    const registerData = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    const response = await createUser(registerData);
    console.log("Réponse de l'API:", response);

    if (response) {
      console.log("Inscription réussie :", response);
      router.push('/login');
    } else {
      errorMessage.value = "Une erreur est survenue. Veuillez réessayer.";
    }
  } catch (error) {
    errorMessage.value = "Échec de l'inscription. Vérifiez vos informations.";
    console.error("Erreur lors de l'inscription:", error);
  };
  resetForm();
};
</script>

<template>
  <div>
    <Form @submit.prevent="submitForm" class="container flex flex-col mx-auto space-y-12">
      <div class="">
        <InputText class="my-8" id="username" type="username" name="Username" placeholder="Username" v-model="username"
          required />
        <InputText class="my-8" id="email" type="email" name="email" placeholder="Email" v-model="email" required />

        <InputPassword :id="password" :name="password" :type="password" placeholder="Password" v-model="password"
          </InputPassword>
      </div>
      <div class="text-center">
        <div>
          <button type="submit"
            class="px-3 py-2 w-full font-semibold text-xl rounded dark:bg-white dark:text-[#0060bf]">
            S'inscrire
          </button>
        </div>
        <div class="my-5 flex items-center justify-center">
          <p class="text-lg font-medium text-white">Vous avez déja un compte? </p>
          <a href="/login" class="ml-2 text-lg font-medium text-white underline">
            Connectez-vous
          </a>
        </div>
      </div>
    </Form>
  </div>
</template>

<style></style>
