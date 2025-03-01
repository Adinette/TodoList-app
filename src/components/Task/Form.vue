<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, toRaw } from "vue";
import InputText from "../Form/InputText.vue";
import Textarea from "../Form/Textarea.vue";
import InputDate from "../Form/InputDate.vue";
import { useGetStatusTasksApi } from "../../api/task-status-api";
import { useCreateTaskApi, useEditTaskApi, useGetTaskApi } from "../../api/task-api";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";

interface Status {
  id: string;
  status: string;
}

interface Task {
  title: string;
  description: string;
  status: string;
  endDate: string;
  startDate: string;
  id: string;
}

const route = useRoute();
const router = useRouter();
const emit = defineEmits(["addTodo", "updateTodo"]);
const props = defineProps<{ selectedTodo: Task | null }>();
const formData = ref<Task>({
  title: "",
  description: "",
  status: "",
  id: "",
  startDate: "",
  endDate: "",
});
const taskId = route.params.id as string;

// Mettre à jour les statuts lorsqu'on reçoit de nouvelles données
const { data: statuses } = useGetStatusTasksApi();

const { data: taskData, isLoading } = useGetTaskApi(taskId, { enabled: !!taskId });

watch(
  () => isLoading.value,
  () => {
    if (taskData.value) {
      formData.value = {
        title: taskData.value.title,
        description: taskData.value.description,
        status: taskData.value.status,
        startDate: taskData.value.startDate,
        endDate: taskData.value.endDate,
      };
    }
  }
);

const { mutateAsync: editTask } = useEditTaskApi();
const { mutateAsync: createTask } = useCreateTaskApi();

const handleSubmit = async () => {
  if (!formData.value.title || !formData.value.description || !formData.value.status) {
    return;
  }

  try {
    const formattedData = {
      ...formData.value,
      startDate: dayjs(formData.value.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(formData.value.endDate).format("YYYY-MM-DD"),
    };

    if (taskId) {
      const dataToUpdate = toRaw(formattedData);
      console.log("Mise à jour de la tâche :", dataToUpdate);
      await editTask({ id: taskId, data: dataToUpdate });
      emit("updateTodo", dataToUpdate);
      router.push("/task-list");
    } else {
      const newTask = toRaw(formData.value);
      const response = await createTask(newTask);
      emit("addTodo", response);
    }
  } catch (error) {
    console.error("Erreur lors de la création ou de la modification de la tâche :", error);
  }
  formData.value = { title: "", description: "", status: "", id: "", startDate: "", endDate: "" };
};
</script>

<template>
  <div>
    <h2 class="text-2xl text-[#0060bf] text-center font-bold mb-4">
      {{ taskId ? "Modifier" : "Ajouter" }} une tâche
    </h2>
    <form @submit.prevent="handleSubmit" class="pb-4">
      <InputText name="taskId" v-model="formData.id" label="" hidden="true" />
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputText name="title" placeholder="Titre de la tâche" v-model="formData.title" required />
        <select
          name="status"
          id="status"
          v-model="formData.status"
          required
          class="p-3 border border-neutral-200 bg-gray-50 rounded-md w-full"
        >
          <option value="">Sélectionner un statut</option>
          <option v-for="status in statuses" :key="status.id" :value="status.status">
            {{ status.status }}
          </option>
        </select>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 my-8">
        <InputDate label="Date de debut" v-model="formData.startDate" />
        <InputDate label="Date de fin" v-model="formData.endDate" />
      </div>
      <Textarea
        name="description"
        placeholder="Description de la tâche"
        v-model="formData.description"
        required
      />
      <div class="my-8 flex justify-center">
        <button
          type="submit"
          class="px-8 py-4 font-semibold text-xl rounded bg-[#0060bf] text-white"
        >
          {{ taskId ? "Modifier" : "Ajouter" }}
        </button>
      </div>
    </form>
  </div>
</template>
