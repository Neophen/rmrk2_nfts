<script setup lang="ts" name="BaseInput">
const props = defineProps<{
  id: string;
  modelValue?: unknown;
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
  <input
    :name="id"
    :id="id"
    class="block w-full px-2 py-1 border border-pink-500 rounded-md"
    v-model="value"
  />
</template>
