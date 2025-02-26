<script setup lang="ts">
import { ref, computed, watch } from "vue";

interface Props {
  name?: string;
  label?: string;
  placeholder?: string;
  modelValue?: string;
  required?: boolean;
  errors?: string | string[];
  warnings?: string | string[];
  inputClass?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue ?? "");

// ⚠️ Synchroniser inputValue avec props.modelValue
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue ?? "";
});

// Mettre à jour la valeur sur input
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const hasError = computed(() => props.errors && props.errors.length > 0);
const firstError = computed(() => (Array.isArray(props.errors) ? props.errors[0] : props.errors));
</script>

<template>
  <div class="">
    <div class="relative">
      <span class="absolute bottom-1.5 left-1.5 p-2 text-sm font-medium">
        <img src="/images/search.png" alt="eye" class="w-4" />
      </span>
      <input :id="name" :name="name" :placeholder="placeholder || label" type="text" v-model="inputValue"
        @input="onInput" :class="[
          'block w-full rounded-md border-0 py-3 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
          hasError ? 'border-danger' : '',
          inputClass
        ]" />
    </div>
    <p v-if="hasError" class="text-danger mt-1 text-sm">{{ firstError }}</p>
  </div>
</template>
