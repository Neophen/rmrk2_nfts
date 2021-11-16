<script setup lang="ts">
import { BasePart } from './types';
import Draggable from 'vuedraggable';

import NftLayer from './components/NftLayer.vue';
import NftLayerSettings from './components/NftLayerSettings.vue';
import InlineSvg from './components/InlineSvg.vue';
import NftCreateLayer from './components/NftCreateLayer.vue';
import BaseCard from './components/BaseCard.vue';
import BaseHeading from './components/BaseHeading.vue';

const parts = ref<BasePart[]>([]);
const selectedPartKey = ref<string | null>(null);

const selectedPartIndex = computed(() => {
  return parts.value.findIndex((part) => part.key === selectedPartKey.value);
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
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold text-center">Let's create an NFT</h1>
    <div class="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
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
                @select="onSelectLayer(element.key)"
                @delete="onRemoveLayer(element.key)"
              />
            </template>
          </Draggable>

          <NftCreateLayer @create="addPart" />
        </div>
      </div>
      <div class="space-y-4">
        <BaseHeading>Layer Settings</BaseHeading>
        <BaseCard>
          <p v-if="!selectedPartKey">Please select a layer</p>
          <NftLayerSettings
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
            viewBox="0 0 1020 1020"
          >
            <InlineSvg
              v-for="(part, i) in parts"
              :key="part.key"
              :svg="part.preview"
              :style="`z-index: ${i}; opacity: ${
                selectedPartKey == null ? '1' : part.key === selectedPartKey ? '1' : '0.6'
              }`"
              width="100%"
              height="100%"
            />
          </svg>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
