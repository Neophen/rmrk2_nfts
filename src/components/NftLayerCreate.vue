<script setup lang="ts" name="NftLayerCreate">
import all from 'it-all';
import { BasePart, IBasePart } from '../types';
import BaseButton from './BaseButton.vue';
import BaseModal from './BaseModal.vue';
import NftLayerSettings from './NftLayerSettings.vue';
import BaseHeading from './BaseHeading.vue';

const props = defineProps<{
  ipfs: unknown;
  count: number;
}>();

const generateId = () => {
  return Math.random().toString(36).substr(2, 11);
};

const generatePart = (): BasePart => {
  return {
    key: generateId(),
    id: `layer_${props.count}`,
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

interface IpfsFile {
  cid: string;
  path: string;
  name: string;
  size: number;
  type: string;
  mode: number;
}

const createParts = async (source: string) => {
  const files: IpfsFile[] = await all(props.ipfs.ls(source));
  const parts = files
    .filter((file) => file.path.endsWith('.svg'))
    .map((file, index) => {
      const { id, type, z } = part.value;
      return {
        id: `${id}_${index}`,
        src: `ipfs://ipfs/${file.path}`,
        name: file.name.replace('.svg', ''),
        type,
        z,
      };
    });

  return parts;
};

const onCreate = async () => {
  let parts: IBasePart[] = part.value.folderCID
    ? await createParts(part.value.folderCID)
    : [];

  emit('create', {
    ...part.value,
    parts,
  });
  showModal.value = false;
  part.value = generatePart();
};
</script>
<template>
  <div>
    <BaseButton @click="showModal = true">Add layer</BaseButton>
    <BaseModal :show="showModal">
      <div class="space-y-4">
        <div class="flex items-center">
          <BaseHeading class="flex-shrink-0 mr-auto">
            Create a layer
          </BaseHeading>
          <BaseButton @click="showModal = false">Close</BaseButton>
        </div>
        <NftLayerSettings v-model:part="part" />
        <BaseButton @click="onCreate">Add</BaseButton>
      </div>
    </BaseModal>
  </div>
</template>
