<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import InputText from '../Form/InputText.vue';
import Textarea from '../Form/Textarea.vue';
import { useGetStatusTasksApi } from '../../api/taskStatus-api';

const emit = defineEmits(["addTodo", "updateTodo"]);

interface Status {
  id: string;
  status: string;
}

interface Task {
  title: string;
  description: string;
  status: string;
  id: string;
}

// Initialisation des valeurs du formulaire
const formData = ref<Task>({ title: "", description: "", status: "", id: "" });
const isEditing = ref(false);

const props = defineProps<{ selectedTodo: Task | null }>();
const statuses = ref<Status[]>([]);

const { data } = useGetStatusTasksApi();
watch(data, (newData) => {
  if (newData) {
    statuses.value = newData as Status[];
  }
});

// Watch pour remplir le champ lors de l'édition
watch(() => props.selectedTodo, (newVal: Task | null) => {

  if (newVal) {
    Object.assign(formData.value, newVal);
    isEditing.value = true;
  } else {
    formData.value = { title: '', description: '', status: '', id: '' };
    isEditing.value = false;
  }
}, { deep: true, immediate: true });

const handleSubmit = () => {
   const statusString = statuses.value.find(status => status.id === formData.value.status)?.status || formData.value.status;
  const formDataToSubmit = { ...formData.value, status: statusString };

  if (isEditing.value) {
    emit('updateTodo', formDataToSubmit);
  } else {
    emit('addTodo', formDataToSubmit);
  }
  formData.value = { title: '', description: '', status: '', id: '' };
  isEditing.value = false;
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="pb-4">
    <InputText name="taskId" v-model="formData.id" label="" hidden="true" />
    <div class="grid grid-cols-2 gap-4 md:grid-cols-2 mb-8">
      <InputText name="title"  placeholder="Titre de la tâche" v-model="formData.title" required />
      <select  name="status" id="status" v-model="formData.status" required
        class="p-3 border border-neutral-200 bg-gray-50 rounded-md w-full">
        <option value="" >Selectionner un status</option>
        <option v-for="status in statuses" :key="status.id" :value="status.id">{{ status.status }}</option>
      </select>
    </div>
    <Textarea name="description" placeholder="Description de la tâche" v-model="formData.description" required />
    <div class="my-8 flex justify-center">
      <button type="submit" class="px-8 py-4 font-semibold text-xl rounded bg-[#0060bf] text-white">
        {{ isEditing ? 'Modifier' : 'Ajouter' }}
      </button>
    </div>
  </form>
</template>
