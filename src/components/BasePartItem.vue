<script setup name="BasePartItem" lang="ts">
import { IBasePart } from 'rmrk-tools/dist/classes/base';

const props = defineProps<{ part: IBasePart }>();
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
  <div class="border shadow rounded-md p-2 space-y-2">
    <p>
      {{ part.id }}
    </p>
    <div class="flex items-center space-x-4">
      <button
        type="button"
        class="w-full py-1 rounded-md border border-pink-500 hover:bg-pink-100"
        @click="onSelect"
      >
        Select
      </button>
      <button
        type="button"
        class="w-full py-1 rounded-md border border-pink-500 hover:bg-pink-100"
        @click="onDelete"
      >
        Delete
      </button>
    </div>
  </div>
</template>
