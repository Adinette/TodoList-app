<script setup lang="ts">
import { computed } from "vue";

interface Props {
  name?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  modelValue?: string | number;
  required?: boolean;
  errors?: string | string[];
  warnings?: string | string[];
  inputClass?: string;
  icon?: string;
  iconAction?: () => void;
}

const props = defineProps<Props>();
const hasError = computed(() => props.errors && props.errors.length > 0);
</script>

<template>
  <div>
    <div class="flex items-center border bg-gray-50 border-neutral-200 rounded-md">
      <input
        :id="name"
        :name="name"
        :type="type || 'text'"
        :placeholder="placeholder || label"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
       :class="[
          'py-3 pl-3 pr-20 border-0 rounded-md bg-gray-50 text-gray-500 w-full',
          hasError ? 'border-danger' : '',
          icon ? 'rounded-r-none' : '',
          inputClass
        ]"
      />
    </div>
  </div>
</template>
