<script setup lang="ts" name="NftBase">
import { BasePart, BaseSettings } from '../types';

import Draggable from 'vuedraggable';
import NftLayer from './NftLayer.vue';
import NftLayerFixedSettings from './NftLayerFixedSettings.vue';
import InlineSvg from './InlineSvg.vue';
import NftLayerCreate from './NftLayerCreate.vue';
import BaseCard from './BaseCard.vue';
import BaseHeading from './BaseHeading.vue';

const props = defineProps<{
  settings: BaseSettings;
  ipfs: unknown;
  modelValue?: BasePart[];
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', payload: BasePart[]): void;
}>();

const viewBox = computed(() => {
  const { width, height } = props.settings;
  return `0 0 ${width} ${height}`;
});

const parts = ref<BasePart[]>(props.modelValue || []);
const selectedPartKey = ref<string | null>(null);

const selectedPartIndex = computed(() => {
  return parts.value.findIndex((part) => part.key === selectedPartKey.value);
});

const isSlot = computed(() => {
  const part = parts.value.find((part) => part.key === selectedPartKey.value);
  return part?.type === 'slot';
});

const onSelectLayer = (key: string) => {
  if (selectedPartKey.value === key) {
    selectedPartKey.value = null;
  } else {
    selectedPartKey.value = key;
  }
};
const onRemoveLayer = (key: string) => {
  if (selectedPartKey.value === key) {
    selectedPartKey.value = null;
  }
  parts.value = parts.value.filter((part) => part.key !== key);
};

const addPart = (part: BasePart) => {
  parts.value = [
    ...parts.value,
    {
      ...part,
      z: parts.value.length,
    },
  ];

  selectedPartKey.value = part.key;
};

watch(
  parts,
  () => {
    emit('update:modelValue', parts.value);
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <div class="space-y-4">
      <BaseHeading>Layers</BaseHeading>
      <div class="space-y-4">
        <BaseCard v-if="parts.length === 0">
          <p>You've not added any layers yet</p>
        </BaseCard>

        <Draggable
          v-model="parts"
          tag="transition-group"
          item-key="key"
          handle=".drag-handle"
        >
          <template #item="{ element }">
            <NftLayer
              :part="element"
              :active="element.key === selectedPartKey"
              @select="onSelectLayer(element.key)"
              @delete="onRemoveLayer(element.key)"
            />
          </template>
        </Draggable>

        <NftLayerCreate @create="addPart" :count="parts.length" :ipfs="ipfs" />
      </div>
    </div>
    <div class="space-y-4">
      <BaseHeading>Layer Settings</BaseHeading>
      <BaseCard>
        <p v-if="!selectedPartKey">Please select a layer</p>
        <NftLayerFixedSettings
          v-else
          :key="selectedPartKey"
          v-model:part="parts[selectedPartIndex]"
        />
      </BaseCard>
    </div>
    <div class="space-y-4">
      <BaseHeading>Preview</BaseHeading>
      <BaseCard>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          :viewBox="viewBox"
        >
          <InlineSvg
            v-for="(part, i) in parts"
            :key="part.key"
            :src="part.preview"
            :style="`z-index: ${i}; opacity: ${
              selectedPartKey == null || isSlot
                ? '1'
                : part.key === selectedPartKey
                ? '1'
                : '0.6'
            }`"
            width="100%"
            height="100%"
          />
        </svg>
      </BaseCard>
    </div>
  </div>
</template>
