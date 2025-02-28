<script setup lang="ts">
defineOptions({
  name: 'HomeView'
})
</script>

<template>
   <div class="space-y-16 bg-[#0060bf] text-white">
    <div class="max-w-2xl px-6 py-24 mx-auto w-full space-y-4 text-center">
      <h1 class="text-5xl font-bold leading-none mb-10">Bonjour !</h1>
      <div class="flex flex-wrap justify-center py-4">
        <img src="../../public/images/signed_up_steve.png" alt="">
      </div>
      <p class="text-xl font-medium dark:text-white my-4">
        Vous êtes nouveau ici? L'appli à-faire intelligente pour les gens occupés! C'est parti! Essayer de vous
        connecter ou de creer un compte.
      </p>
      <div class="">
        <router-link to="/login" type="button"
          class="px-3 py-2 font-semibold text-xl rounded dark:bg-white dark:text-[#0060bf]">Continuer vers l'app</router-link>
      </div>
    </div>
  </div>
</template>
