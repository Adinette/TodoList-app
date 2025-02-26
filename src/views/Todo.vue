<script setup lang="ts">
import { ref, reactive, computed, watch, toRaw } from 'vue';
import List from '@/components/Task/List.vue';
import Form from '@/components/Task/Form.vue';
import { useDeleteTaskApi, useEditTaskApi, useCreateTaskApi, useGetTasksApi } from '@/api/task-api';
import {useGetStatusTasksApi} from '../api/taskStatus-api';
import Dropdown from '../components/drop-down.vue';
import InputSearch from '../components/Form/InputSearch.vue';

interface Status {
  id: string;
  status: string;
}

// Déclaration des variables réactives
const tasks = ref([]);
const selectedTodo = ref(null);
const formData = reactive({ title: '' });
const statuses = ref<Status[]>([]);
const selectedStatus = ref('En cours');


const { data } = useGetStatusTasksApi();

// Mettre à jour la liste des statuts quand l'API répond
watch(data, (newData) => {
  if (newData) {
    statuses.value = newData as Status[];
  }
});
// Fonction pour récupérer les tâches
const { data: tasksData, refetch: fetchTasks } = useGetTasksApi();
watch(tasksData, (newTasks) => {
  if (newTasks) tasks.value = newTasks;
}, { immediate: true });

// Fonction pour supprimer une tâche
const deleteMutation = useDeleteTaskApi();
const deleteTodo = async (id) => {
  try {
    console.log("Tentative de suppression de la tâche avec ID:", id);
    await deleteMutation.mutateAsync(id);
    tasks.value = tasks.value.filter(task => task?.id !== id);
  } catch (err) {
    console.error("Erreur lors de la suppression de la tâche:", err);
  }
};

// Fonction pour ajouter une tâche
const { mutateAsync: createTask } = useCreateTaskApi();
const addTodo = async (newTodo) => {
  try {
    if (!newTodo.title || !newTodo.description) {
      console.error("Le titre et la description sont obligatoires");
      return;
    }
    const response = await createTask(newTodo);
    tasks.value.push(response);
    await fetchTasks();
  } catch (error) {
    console.error("Erreur lors de l'ajout:", error);
  }
};

// Fonction pour éditer une tâche
const editTodo = (todo) => {
  selectedTodo.value = reactive({ ...todo });
};

const { mutateAsync: editTask } = useEditTaskApi();
const updateExistingTodo = async () => {
  if (!selectedTodo.value || !selectedTodo.value.id) {
    console.error("Aucune tâche sélectionnée pour modification");
    return;
  }
  try {
    if (!selectedTodo.value?.title || !selectedTodo.value?.description) {
      console.error("Le titre et la description sont obligatoires");
      return;
    }
    await editTask({ ...toRaw(selectedTodo.value) });
    await fetchTasks();
    selectedTodo.value = null;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error.response?.data || error);
  }
};

// Générer les options pour le dropdown dynamiquement
const statusOptions = computed(() =>
  statuses.value.map(status => ({ label: status.status, value: status.id }))
);


// Filtrer les tâches en fonction du statut et du titre
const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    const statusMatch = selectedStatus.value === 'all' || task.status === selectedStatus.value;
    const titleMatch = !formData.title || task.title.toLowerCase().includes(formData.title.toLowerCase());
    return statusMatch && titleMatch;
  });
});

const displayedTasks = computed(() => {
  const hasSearch = formData.title.trim() !== "";
  const hasFilter = selectedStatus.value !== "En cours";

  if (hasSearch || hasFilter) {
    return filteredTasks?.value;
  }
  return tasksData.value;
});

</script>

<template>
  <div class="max-w-7xl mx-auto py-20 px-60 pt-40">
    <Form :selectedTodo="selectedTodo" @addTodo="addTodo" @updateTodo="updateExistingTodo" />
    <div class="flex items-center">
      <InputSearch name="search" placeholder="Recherche par titre" v-model="formData.title" />
      <Dropdown v-model="selectedStatus" :options="statusOptions" />
    </div>
    <div>
      <List
  :todos="displayedTasks"
  @editTodo="editTodo"
  @deleteTodo="deleteTodo"
/>
    </div>
  </div>
</template>
