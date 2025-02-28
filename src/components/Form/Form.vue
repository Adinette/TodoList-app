<script setup>
import { ref, defineProps, defineExpose } from "vue";

const formRef = ref(null);
defineExpose({ formRef });

const props = defineProps({
  class: String,
});
</script>

<template>
  <form ref="formRef" v-bind="$attrs" :class="props.class">
    <slot></slot>
  </form>
</template>
