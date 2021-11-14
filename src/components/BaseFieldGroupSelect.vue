<script setup lang="ts" name="BaseFieldGroupSelect">
import BaseFieldGroupSelectButton from './BaseFieldGroupSelectButton.vue';
defineProps<{
  modelValue: string;
  options: string[];
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();
</script>
<template>
  <div class="flex items-center p-1 bg-pink-500 rounded-md">
    <BaseFieldGroupSelectButton
      v-for="(option, index) in options"
      :key="index"
      :option="option"
      :selected="modelValue"
      @click="emit('update:modelValue', option)"
    />
  </div>
</template>
