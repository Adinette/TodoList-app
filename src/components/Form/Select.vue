<script setup lang="ts">
import { ref, computed } from "vue";

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
const firstError = computed(() => (Array.isArray(props.errors) ? props.errors[0] : props.errors));
</script>

<template>
  <div>
    <label v-if="label" :for="name" class="mb-2 text-base text-gray-500">
      {{ label }} <span v-if="required" class="text-danger">*</span>
    </label>

    <select
      :id="name"
      :name="name"
      v-model="modelValue"
      @change="onChange"
      :class="[
        'p-3 border border-neutral-200 bg-gray-50 rounded-md w-full',
        hasError ? 'border-danger' : '',
        inputClass
      ]"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <p v-if="hasError" class="text-danger mt-1 text-sm">{{ firstError }}</p>
  </div>
</template>
