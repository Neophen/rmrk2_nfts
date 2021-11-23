<script setup name="NftLayer" lang="ts">
import { BasePart } from '../types';
import IconButton from './IconButton.vue';

defineProps<{ part: BasePart; active: boolean }>();
const emit = defineEmits<{
  (event: 'select'): void;
  (event: 'delete'): void;
}>();

const onDelete = () => {
  emit('delete');
};
const onSelect = () => {
  emit('select');
};
</script>
<template>
  <div
    class="relative flex items-center p-2 border rounded-md shadow"
    :class="{
      'bg-pink-400 text-white hover:bg-pink-600': active,
      'hover:bg-pink-50': !active,
    }"
  >
    <button
      @click="onSelect"
      class="absolute inset-0 z-0 w-full h-full"
    ></button>
    <IconButton class="z-10" icon="trash" @click="onDelete" />
    <p class="ml-2 mr-auto">{{ part.id }}</p>
    <IconButton class="z-10 drag-handle" icon="drag" />
  </div>
</template>
