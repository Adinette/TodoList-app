<script setup lang="ts">
import { ref } from 'vue';
import { useForgotPasswordInApi } from '../../api/auth-api';
import InputText from '../Form/InputText.vue';
import Form from '../Form/Form.vue';

const email = ref('');
const errorMessage = ref('');
const ForgotForm = () => {
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
    if (response && response.data.token) {
    } else {
      errorMessage.value = "Email incorrect.";
    }
  } catch {
    errorMessage.value = "Échec de l'envoie de mail.";
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
