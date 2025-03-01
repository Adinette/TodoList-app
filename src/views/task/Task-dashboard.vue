<script setup lang="ts">
import { ref, watch } from "vue";
import { useGetTasksApi } from "../../api/task-api";
import Dashboard from "../../components/Task/dashboard.vue";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
}

const tasks = ref<Task[]>([]);
const { data: tasksData } = useGetTasksApi();
watch(tasksData, (newTasks) => {
  if (newTasks) tasks.value = newTasks as Task[];
});
</script>

<template>
  <div class="md:max-w-2xl lg:max-w-3xl w-96 md:w-full mx-auto pt-24 pb-20 md:pb-60">
    <h2 class="text-2xl text-[#0060bf] text-center font-bold mb-6">Mon tableau de Bord</h2>
    <Dashboard :tasks="tasks" />
  </div>
</template>
