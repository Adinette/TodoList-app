<script setup lang="ts">
import { ref, computed } from "vue";

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
const isPasswordVisible = ref(false);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const hasError = computed(() => props.errors && props.errors.length > 0);
const firstError = computed(() => (Array.isArray(props.errors) ? props.errors[0] : props.errors));
</script>

<template>
  <div class="">
    <label v-if="label" :for="name" class="mb-2 text-base text-gray-500">
      {{ label }} <span v-if="required" class="text-danger">*</span>
    </label>

    <div class="relative">
      <input :id="name" :name="name" :placeholder="placeholder || label" :type="isPasswordVisible ? 'text' : 'password'"
        v-model="inputValue" @input="onInput" :class="[
          'block w-full rounded-md border-0 py-3 pl-3 pr-20 text-white ring-1 ring-inset ring-gray-300 placeholder:text-text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
          hasError ? 'border-danger' : '',
          inputClass
        ]" />
      <button @click="isPasswordVisible = !isPasswordVisible" type="button"
        class="absolute top-1 right-4 p-2 text-sm font-medium cursor-pointer ">
        <img :src="isPasswordVisible ? '/images/view.png' : '/images/hide.png' " alt="eye" class="w-6"/>
      </button>
    </div>

    <p v-if="hasError" class="text-danger mt-1 text-sm">{{ firstError }}</p>
  </div>
</template>
