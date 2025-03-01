<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useGetStatusTasksApi } from "../../api/task-status-api";
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
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 bg-blue-500 text-white rounded-lg shadow">
        <h2 class="text-3xl font-bold">Total des Tâches</h2>
        <span class="text-2xl font-semibold">{{ totalTasks }}</span>
      </div>
      <div v-for="status in statuses" :key="status.name" class="p-4 bg-green-500 text-white rounded-lg shadow">
        <h2 class="text-3xl font-bold">Tâche {{ status.name }}</h2>
        <span class="text-2xl font-semibold">{{ status.count }}</span>
      </div>
    </div>
  </div>
</template>
