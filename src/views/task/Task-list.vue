<script setup lang="ts">
import { ref } from 'vue';
import List from '../../components/Task/List.vue';

const tasks = ref([]);

</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Liste des Tâches</h1>
    <List />
    <div v-if="tasks.length === 0" class="text-center text-gray-500 mt-4">
      Aucune tâche disponible.
    </div>
  </div>
</template>
