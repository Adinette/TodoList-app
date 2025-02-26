<script setup lang="ts">
import { ref, computed } from "vue";

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
const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue ?? "");

// Met à jour la valeur lors de la saisie
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const hasError = computed(() => props.errors && props.errors.length > 0);
const firstError = computed(() => (Array.isArray(props.errors) ? props.errors[0] : props.errors));
const firstWarning = computed(() => (Array.isArray(props.warnings) ? props.warnings[0] : props.warnings));
</script>

<template>
  <div>
    <!-- Label -->
    <label v-if="label" :for="name" class="mb-2 text-base text-gray-500">
      {{ label }} <span v-if="required" class="text-danger">*</span>
    </label>

    <!-- Input Container -->
    <div class="flex items-center border bg-gray-50 border-neutral-200 rounded-md">
      <input
        :id="name"
        :name="name"
        :type="type || 'text'"
        :placeholder="placeholder || label"
        v-model="inputValue"
        @input="onInput"
        :class="[
          'py-3 pl-3 pr-20  border-0 bg-gray-50 text-gray-500 w-full',
          hasError ? 'border-danger' : '',
          icon ? 'rounded-r-none' : '',
          inputClass
        ]"
      />
      <!-- Icône (si fournie) -->
      <button v-if="icon" @click="iconAction" class="p-2 text-sm font-medium cursor-pointer">
        <i :class="icon"></i>
      </button>
    </div>

    <!-- Messages d'avertissement et d'erreur -->
    <p v-if="warnings" class="text-alert mt-1 text-sm">{{ firstWarning }}</p>
    <p v-if="hasError" class="text-danger mt-1 text-sm">{{ firstError }}</p>
  </div>
</template>
