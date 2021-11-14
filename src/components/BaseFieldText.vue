<script setup lang="ts" name="BaseFieldText">
import BaseLabel from './BaseLabel.vue';
import BaseInput from './BaseInput.vue';

const props = defineProps<{
  id: string;
  label: string;
  modelValue: unknown;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: unknown): void;
}>();

const value = ref(props.modelValue);

watch(
  () => props.modelValue,
  (value) => {
    emit('update:modelValue', value);
  }
);
</script>
<template>
  <div>
    <BaseLabel :for="id">{{ label }}</BaseLabel>
    <BaseInput type="text" :id="id" v-model="value" />
  </div>
</template>
