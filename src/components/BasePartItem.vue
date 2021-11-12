<script setup name="BasePartItem" lang="ts">
import { NftPart } from '../types';

const props = defineProps<{ part: NftPart }>();
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
  <div class="p-2 space-y-2 border rounded-md shadow">
    <p>
      {{ part.id }}
    </p>
    <div class="flex items-center space-x-4">
      <button
        type="button"
        class="w-full py-1 border border-pink-500 rounded-md hover:bg-pink-100"
        @click="onSelect"
      >
        Select
      </button>
      <button
        type="button"
        class="w-full py-1 border border-pink-500 rounded-md hover:bg-pink-100"
        @click="onDelete"
      >
        Delete
      </button>
    </div>
  </div>
</template>
