<script setup lang="ts" name="NftCreateLayer">
import { BasePart } from '../types';
import BaseButton from './BaseButton.vue';
import BaseModal from './BaseModal.vue';
import NftLayerSettings from './NftLayerSettings.vue';
import BaseHeading from './BaseHeading.vue';

const generateId = () => {
  return Math.random().toString(36).substr(2, 11);
};

const generatePart = (): BasePart => {
  return {
    key: generateId(),
    id: generateId(),
    type: 'fixed',
    equippable: '*',
    unequip: undefined,
    z: 0,
    src: '',
  };
};

const emit = defineEmits<{
  (event: 'create', part: BasePart): void;
}>();

const showModal = ref(false);

const part = ref<BasePart>(generatePart());

const onCreate = () => {
  emit('create', part.value);
  showModal.value = false;
  part.value = generatePart();
};
</script>
<template>
  <div>
    <BaseButton @click="showModal = true">Add layer</BaseButton>
    <BaseModal :show="showModal">
      <div class="flex items-center">
        <BaseHeading class="flex-shrink-0 mr-auto">Create a layer</BaseHeading>
        <BaseButton @click="showModal = false">Close</BaseButton>
      </div>
      <NftLayerSettings v-model:part="part" />
      <BaseButton @click="onCreate">Add</BaseButton>
    </BaseModal>
  </div>
</template>
