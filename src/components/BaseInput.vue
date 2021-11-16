<script setup lang="ts" name="BaseInput">
import { useVModel } from '../features/useVModel';

const props = defineProps<{
  id: string;
  modelValue?: unknown;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: unknown): void;
}>();

const value = useVModel(props, emit);
</script>
<template>
  <input
    :name="id"
    :id="id"
    class="block w-full px-2 py-1 border border-pink-500 rounded-md"
    v-model="value"
  />
</template>
