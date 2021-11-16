<script setup lang="ts" name="BaseFieldText">
import { useVModel } from '../features/useVModel';

import BaseLabel from './BaseLabel.vue';
import BaseInput from './BaseInput.vue';

interface Modifiers {
  snake?: boolean;
  lower?: boolean;
}

const props = withDefaults(
  defineProps<{
    id: string;
    label: string;
    modelValue: unknown;
    modelModifiers?: Modifiers;
  }>(),
  {
    modelModifiers: () => ({}),
  }
);

const emit = defineEmits<{
  (event: 'update:modelValue', value: unknown): void;
}>();

const value = useVModel(props, emit);

const emitValue = (rawValue: unknown) => {
  let inputValue = rawValue as string;

  if (props.modelModifiers.snake) {
    inputValue = inputValue.replaceAll(' ', '_');
  }
  if (props.modelModifiers.lower) {
    inputValue = inputValue.toLowerCase();
  }
  emit('update:modelValue', inputValue);
};
</script>
<template>
  <div>
    <BaseLabel :for="id">{{ label }}</BaseLabel>
    <BaseInput
      type="text"
      :id="id"
      :modelValue="modelValue"
      @update:modelValue="emitValue"
    />
  </div>
</template>
