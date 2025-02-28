<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useGetStatusTasksApi } from "../../api/taskStatus-api";
import { useGetTasksApi } from "../../api/task-api";

const tasks = ref<{ id: number; title: string; description: string; status: string }[]>([]);
const statuses = ref<{ name: string; count: number }[]>([]);

// Calcul du nombre total de tâches
const { data: tasksData } = useGetTasksApi();
const updateStatusCounts = () => {
  const statusCounts = {
    "En cours": 0,
    "Terminée": 0,
    "En attente": 0,
  };
  tasks.value.forEach((task) => {
    if (statusCounts.hasOwnProperty(task.status)) {
      statusCounts[task.status]++;
    }
  });
  statuses.value = Object.keys(statusCounts).map((status) => ({
    name: status,
    count: statusCounts[status],
  }));
}
onMounted(async () => {
  const { data: statusData } = useGetStatusTasksApi();

  if (statusData.value) {
    updateStatusCounts();
  }
});

watch(tasksData, (newTasks) => {
  if (newTasks) {
    tasks.value = newTasks;
    updateStatusCounts();
  }
}, { immediate: true });
const totalTasks = computed(() => tasks.value.length);
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl text-center mb-8 font-bold">Tableau de Bord</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="p-4 bg-blue-500 text-white rounded-lg shadow">
        <h2 class="text-xl font-bold">Total des Tâches</h2>
        <p class="text-2xl">{{ totalTasks }}</p>
      </div>
      <div v-for="status in statuses" :key="status.name" class="p-4 bg-green-500 text-white rounded-lg shadow">
        <h2 class="text-xl font-bold">{{ status.name }}</h2>
        <p class="text-2xl">{{ status.count }}</p>
      </div>
    </div>
  </div>
</template>
