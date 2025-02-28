<script setup lang="ts">
import { ref, watch } from 'vue';
import { useGetTasksApi } from '../../api/task-api';
import Dashboard from '../../components/Task/Dashboard.vue';

const tasks = ref([]);
const { data: tasksData } = useGetTasksApi();
watch(tasksData, (newTasks) => { if (newTasks) tasks.value = newTasks; });
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Tableau de Bord</h1>
    <Dashboard :tasks="tasks" />
  </div>
</template>
