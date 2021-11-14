<script setup lang="ts">
import { BasePart } from './types';

import NftLayer from './components/NftLayer.vue';
import NftLayerSettings from './components/NftLayerSettings.vue';
import InlineSvg from './components/InlineSvg.vue';
import NftCreateLayer from './components/NftCreateLayer.vue';
import BaseCard from './components/BaseCard.vue';
import BaseHeading from './components/BaseHeading.vue';

const parts = ref<BasePart[]>([]);
const selectedPart = ref<BasePart | null>(null);

const addPart = (part: BasePart) => {
  const length = parts.value.push({
    ...part,
    z: parts.value.length,
  });

  selectedPart.value = parts.value[length - 1];
};
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold text-center">Let's create an NFT</h1>
    <div class="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
      <div class="">
        <BaseHeading>Parts</BaseHeading>
        <div class="space-y-4">
          <NftLayer
            v-for="(part, i) in parts"
            :key="part.key"
            :part="part"
            @select="selectedPart = part"
            @delete="parts.splice(i, 1)"
          />
          <NftCreateLayer @create="addPart" />
        </div>
      </div>
      <div class="">
        <BaseHeading>Settings</BaseHeading>
        <BaseCard>
          <p v-if="!selectedPart">Please select a part</p>
          <NftLayerSettings v-else v-model:part="selectedPart" />
        </BaseCard>
      </div>
      <div class="">
        <BaseHeading>Preview</BaseHeading>
        <BaseCard>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1080 1512"
          >
            <InlineSvg
              v-for="(part, i) in parts"
              :key="part.key"
              :svg="part.preview"
              :style="`z-index: ${i}; opacity: ${
                part.key === selectedPart?.key ? '1' : '0.6'
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
