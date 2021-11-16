<script setup name="NftLayer" lang="ts">
import { BasePart } from '../types';
import IconButton from './IconButton.vue';

defineProps<{ part: BasePart }>();
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
    class="relative flex items-center p-2 border rounded-md shadow hover:bg-pink-50"
  >
    <button
      @click="onSelect"
      class="absolute inset-0 z-0 w-full h-full"
    ></button>
    <IconButton class="z-10" icon="trash" @click="onDelete" />
    <p class="ml-2 mr-auto">
      {{ part.id }}
    </p>
    <IconButton class="z-10 drag-handle" icon="drag" />
  </div>
</template>
