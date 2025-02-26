<script setup>
import { defineEmits, ref } from 'vue';
import { useForgotPasswordInApi } from '../../api/auth-api';
import InputText from '../Form/InputText.vue';
import Form from '../Form/Form.vue';

const emit = defineEmits(['  ForgotPassword']);

const email = ref('');
const errorMessage = ref('');

const   ForgotForm = () => {
  email.value = '';
};

const { mutateAsync: userForgotPassword } = useForgotPasswordInApi();

const submitForm = async () => {
  try {
    errorMessage.value = '';

    const credentials = {
      email: email.value,
    };
    const response = await userForgotPassword(credentials);
    console.log("Réponse de l'API:", response);

    if (response && response.token) {
      console.log("Envoie de mail reussie :", response);
    } else {
      errorMessage.value = "Email incorrect.";
    }
  } catch (error) {
    errorMessage.value = "Échec de l'envoie de mail.";
    console.error("Erreur lors de l'envoie de mail:", error);
  };
    ForgotForm();
};
</script>

<template>
  <div>
    <Form @submit.prevent="submitForm" class="container flex flex-col mx-auto space-y-12">
        <div class="">
          <InputText class="my-8" id="email" type="email" name="email" placeholder="Email" v-model="email" required />
        </div>
        <div class="text-center">
          <div class="mb-4">
            <button type="submit" class="text-lg font-medium text-white underline">
              Recuperer mon mot de passe
            </button>
          </div>
        </div>
      </Form>
  </div>
  </template>
