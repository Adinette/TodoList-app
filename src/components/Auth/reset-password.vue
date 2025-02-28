<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useResetPasswordInApi } from "../../api/auth-api";
import InputPassword from "../Form/InputPassword.vue";
import Form from "../Form/Form.vue";

const route = useRoute();
const router = useRouter();
const token = route.params.token;
const newPassword = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const successMessage = ref("");

const { mutateAsync: resetPassword } = useResetPasswordInApi();
const submitForm = async () => {
  errorMessage.value = "";
  successMessage.value = "";
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = "Les mots de passe ne correspondent pas.";
    return;
  }
  try {
    if (!token) {
      errorMessage.value = "Token de réinitialisation manquant.";
      return;
    }
    await resetPassword({ newPassword: newPassword.value, token });
    successMessage.value = "Mot de passe réinitialisé avec succès.";
    setTimeout(() => router.push("/login"), 2000);
  } catch (error) {
    errorMessage.value = "Erreur lors de la réinitialisation du mot de passe.";
    throw error;
  }
};
</script>

<template>
  <div class="container mx-auto flex flex-col space-y-12">
    <Form @submit.prevent="submitForm" class="space-y-6">
      <InputPassword class="my-8" :id="newPassword" :name="newPassword" :type="newPassword"
        placeholder="Nouveau mot de passe" v-model="newPassword"></InputPassword>
      <InputPassword :id="confirmPassword" :name="confirmPassword" :type="confirmPassword"
        placeholder="Confirmer le mot de passe" v-model="confirmPassword"></InputPassword>
      <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-md">
        Modifier mon mot de passe
      </button>
    </Form>
  </div>
</template>
