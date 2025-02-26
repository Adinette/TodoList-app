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
  rows?: number;
  inputClass?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const textValue = ref(props.modelValue ?? "");

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
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

    <textarea
      :id="name"
      :name="name"
      :placeholder="placeholder || label"
      v-model="textValue"
      @input="onInput"
      :rows="rows || 3"
      :class="[
        'p-3 border border-neutral-200 bg-gray-50 rounded-md w-full',
        hasError ? 'border-danger' : '',
        inputClass
      ]"
    ></textarea>

    <p v-if="hasError" class="text-danger mt-1 text-sm">{{ firstError }}</p>
  </div>
</template>
