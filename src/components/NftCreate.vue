<script setup lang="ts" name="NftCreate">
import { BaseSettings } from '../types';
import BaseFieldText from './BaseFieldText.vue';
import BaseButton from './BaseButton.vue';

const emit = defineEmits<{
  (event: 'create', settings: BaseSettings): void;
}>();

const settings = ref<BaseSettings>({
  name: '',
  description: '',
  width: 1020,
  height: 1020,
});

const onCreate = () => {
  emit('create', settings.value);
};
</script>
<template>
  <div class="w-full mx-auto space-y-4 md:max-w-md">
    <BaseFieldText id="name" v-model.trim="settings.name" label="Name" />
    <BaseFieldText
      id="description"
      v-model.trim="settings.description"
      label="Description (Optional)"
    />
    <BaseFieldText id="width" v-model.number="settings.width" label="Width" />
    <BaseFieldText
      id="height"
      v-model.number="settings.height"
      label="Height"
    />
    <BaseButton @click="onCreate">Create</BaseButton>
  </div>
</template>
