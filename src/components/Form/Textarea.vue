<script setup lang="ts">
import { computed } from "vue";

interface Props {
  name?: string;
  label?: string;
  placeholder?: string;
  modelValue?: string;
  required?: boolean;
  errors?: string | string[];
  warnings?: string | string[];
  rows?: number;
  inputClass?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
const hasError = computed(() => props.errors && props.errors.length > 0);
</script>

<template>
  <div>
    <textarea :id="name" :name="name" :placeholder="placeholder || label" :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" :rows="rows || 3" :class="[
        'p-3 border border-neutral-200 bg-gray-50 rounded-md w-full',
        hasError ? 'border-danger' : '',
        inputClass
      ]"></textarea>
  </div>
</template>
