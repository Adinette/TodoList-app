<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useGetTasksApi, useDeleteTaskApi, useEditStatusTaskApi } from '../../api/task-api';
import { useGetStatusTasksApi } from '../../api/task-status-api';
import Dropdown from '../../components/drop-down.vue';
import InputSearch from '../../components/Form/InputSearch.vue';
import dayjs from "dayjs";

interface Status {
  id: string;
  status: string;
}
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  endDateFormat: string;
  startDateFormat: string;
}

const tasks = ref<Task[]>([]);
const statuses = ref<Status[]>([]);
const formData = ref({ title: '' });
const selectedStatus = ref('Tous');

// Mettre à jour la liste des statuts quand l'API répond
const { data: statusData } = useGetStatusTasksApi();
watch(statusData, (newData) => {
  if (newData) {
    statuses.value = newData as Status[];
  }
}, { immediate: true });

const { data: tasksData, refetch: fetchTasks } = useGetTasksApi();

// Mettre à jour `tasks` et émettre les données.
watch(tasksData, (newTasks) => {
  if (newTasks) {
    tasks.value = newTasks?.map(task => ({
      ...task,
      startDateFormat: dayjs(task.startDate).format("YYYY-MM-DD"),
      endDateFormat: dayjs(task.endDate).format("YYYY-MM-DD"),
    }));
  }
}, { immediate: true });


// Fonction pour supprimer une tâche
const deleteMutation = useDeleteTaskApi();
const deleteTodo = async (id: any) => {
  try {
    console.log("Tentative de suppression de la tâche avec ID:", id);
    await deleteMutation.mutateAsync(id);
    if (!tasks.value) {
      console.error("tasks.value est undefined !");
      return;
    }
    fetchTasks();
  } catch (err) {
    console.error("Erreur lors de la suppression de la tâche:", err);
  }
};
const handleDeleteClick = (id: number) => {
  const isConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?');
  if (isConfirmed) {
    deleteTodo(id);
  }
};

// Fonction pour modifier le statut d'une tâche en fonction de la date
const editMutation = useEditStatusTaskApi();
const handleStatusClick = async (task: Task) => {
  const currentDate = dayjs().format("YYYY-MM-DD");
  const startDate = dayjs(task.startDate).format("YYYY-MM-DD");
  const endDate = dayjs(task.endDate).format("YYYY-MM-DD");

  if (currentDate >= startDate && currentDate <= endDate) {
    task.status = 'En cours';
  } else if (currentDate > endDate) {
    task.status = 'Terminée';
  }

  try {
    await editMutation.mutateAsync({ id: task.id, data: { status: task.status } });
    const taskIndex = tasks.value.findIndex(t => t.id === task.id);
    if (taskIndex !== -1) {
      tasks.value[taskIndex].status = task.status;
    }
    fetchTasks();
  } catch (err) {
    console.error("Erreur lors de la mise à jour du statut de la tâche:", err);
  }
};

// Liste des options pour le filtre de statut
const statusOptions = computed(() => [{ label: 'Tous', value: 'Tous' }, ...statuses.value.map(s => ({ label: s.status, value: s.status }))]);

// Liste filtrée
const filteredTodos = computed(() => {
  return tasks.value.filter(todo => {
    const matchesTitle = !formData.value.title || todo.title.toLowerCase().includes(formData.value.title.toLowerCase());
    const matchesStatus = selectedStatus.value === 'Tous' || todo.status === selectedStatus.value;
    return matchesTitle && matchesStatus;
  });
});
</script>

<template>
  <div class="">
    <div class="flex items-center gap-4 mb-10">
      <InputSearch name="search" placeholder="Recherche par titre" v-model="formData.title" class="text-ellipsis whitespace-nowrap w-full overflow-hidden max-w-2xl" />
      <Dropdown v-model="selectedStatus" :options="statusOptions" />
    </div>
    <div class="overflow-x-auto">
      <table class="table table-bordered table-striped min-w-full text-xs w-full p-6 text-left whitespace-nowrap">
        <thead>
          <tr class="text-center dark:border-gray-300 dark:bg-gray-50">
            <th class="p-3 text-xl">Titre</th>
            <th class="p-3 text-xl text-ellipsis whitespace-nowrap">Date de debut</th>
            <th class="p-3 text-xl text-ellipsis whitespace-nowrap">Date de fin</th>
            <th class="p-3 text-xl">Statut</th>
            <th class="p-3 text-xl">Actions</th>
          </tr>
        </thead>
        <tbody id="taskList">
          <tr v-for="todo in filteredTodos" :key="todo.id" class="text-lg border text-center border-opacity-20">
            <td class="p-3 text-ellipsis whitespace-nowrap">{{ todo.title }}</td>
            <td class="p-3">{{ todo.startDateFormat }}</td>
            <td class="p-3">{{ todo.endDateFormat }}</td>          <td class="p-3">
              <button @click="handleStatusClick(todo)" class="w-full h-full cursor-pointer text-ellipsis whitespace-nowrap bg-[#0060bf] text-white rounded-full px-3 py-2">
                {{ todo.status }}
              </button>
            </td>
            <td class="flex justify-center p-3">
              <router-link :to="`/task-form/${todo.id}`" class="me-3 w-8 h-8 cursor-pointer">
                <img src="../../../public/images/edit.png" alt="Modifier">
              </router-link>
              <button @click="handleDeleteClick(todo.id)" class="w-8 h-8 cursor-pointer">
                <img src="../../../public/images/delete.png" alt="Supprimer">
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
