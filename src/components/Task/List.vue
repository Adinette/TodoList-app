<script setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['editTodo', 'deleteTodo']);

const handleDeleteClick = (id) => {
  console.log('Clic détecté pour la suppression de la tâche', id);
  const isConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?');
  if (isConfirmed) {
    emit('deleteTodo', id);
  }
};


const props = defineProps({
  todos: Array,
});

</script>

<template>
  <div class="container mt-10">
    <table class="table table-bordered table-striped min-w-full text-xs">
      <thead>
        <tr class="text-center dark:border-gray-300 dark:bg-gray-50">
          <th class="p-3 text-xl">Titre</th>
          <th class="p-3 text-xl">Description</th>
          <th class="p-3 text-xl">Statut</th>
          <th class="p-3 text-xl">Actions</th>
        </tr>
      </thead>
      <tbody id="taskList">
        <tr v-for="todo in todos" :key="todo?.id" class="text-lg border text-center border-opacity-20">
          <td class="p-3">{{ todo?.title }}</td>
          <td class="p-3">{{ todo?.description }}</td>
          <td class="p-3">{{ todo?.status }}</td>
          <td class="flex justify-center p-3">
            <button @click="emit('editTodo', todo)" class="me-3 w-8 h-8 cursor-pointer">
              <img src="../../../public/images/edit.png" alt="">
            </button>
            <button   @click="handleDeleteClick(todo.id)"
            class="w-8 h-8 cursor-pointer">
              <img src="../../../public/images/delete.png" alt="">
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
