<script setup lang="ts">
import { computed } from "vue";

interface Props {
  name?: string;
  label?: string;
  modelValue?: string | number;
  required?: boolean;
  errors?: string | string[];
  options: { value: string | number; label: string }[];
  inputClass?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
};
const hasError = computed(() => props.errors && props.errors.length > 0);
</script>

<template>
  <div>
    <select :id="name" :name="name" v-model="modelValue" @change="onChange" :class="[
      'p-3 border border-neutral-200 bg-gray-50 rounded-md w-full',
      hasError ? 'border-danger' : '',
      inputClass
    ]">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
