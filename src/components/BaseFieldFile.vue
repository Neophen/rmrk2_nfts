<script setup lang="ts" name="BaseFieldText">
import BaseLabel from './BaseLabel.vue';
import BaseInput from './BaseInput.vue';

defineProps<{
  id: string;
  label: string;
  accept: string;
}>();

const emit = defineEmits<{
  (event: 'change', files: FileList): void;
}>();

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  emit('change', target.files);
};
</script>
<template>
  <div>
    <BaseLabel :for="id">{{ label }}</BaseLabel>
    <BaseInput type="file" :id="id" @change="onFileChange" :accept="accept" />
  </div>
</template>
