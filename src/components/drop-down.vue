<script setup lang="ts">
import { ref } from 'vue';
import {
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'radix-vue';

defineProps<{
  options: { label: string; value: string }[];
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);

const toggleState = ref(false);

const handleSelect = (value: string) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <DropdownMenuRoot v-model:open="toggleState">
    <DropdownMenuTrigger
      class="ml-4 rounded-md py-3 pl-4 w-full border-1 border-gray-300 text-gray-900 flex items-center justify-between">
      Filtrer par statut
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent class="min-w-[350px] bg-white rounded-md shadow-md p-2 relative -right-4" :side-offset="5">
        <DropdownMenuItem v-for="option in options" :key="option.value"
          class="cursor-pointer p-2 hover:bg-gray-200 rounded-md" @click="handleSelect(option.value)">
          {{ option.label }}
        </DropdownMenuItem>
        <DropdownMenuArrow class="fill-white" />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
