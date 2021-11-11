<script setup lang="ts">
import { IBasePart } from 'rmrk-tools/dist/classes/base';

import BasePart from './components/BasePart.vue';
import BasePartItem from './components/BasePartItem.vue';
import InlineSvg from './components/InlineSvg.vue';
interface MyPart extends IBasePart {
  key: string;
  preview?: string;
}
const parts = ref<MyPart[]>([]);
const selectedPart = ref<MyPart | null>(null);

const addPart = () => {
  parts.value.push({
    key: Math.random().toString(36).substr(2, 9),
    id: Math.random().toString(36).substr(2, 9),
    type: 'fixed',
    equippable: '*',
    unequip: undefined,
    z: parts.value.length,
    src: '',
  });
};
</script>

<template>
  <div class="p-8">
    <h1 class="text-center text-2xl font-bold">Let's create an NFT</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <div class="">
        <h2 class="font-bold text-xl">Parts</h2>
        <div class="space-y-4">
          <BasePartItem
            v-for="(part, i) in parts"
            :key="part.key"
            :part="part"
            @select="selectedPart = part"
            @delete="parts.splice(i, 1)"
          />
          <button
            type="button"
            class="
              w-full
              py-1
              rounded-md
              border border-pink-500
              hover:bg-pink-100
            "
            @click="addPart"
          >
            Add part
          </button>
        </div>
      </div>
      <div class="">
        <h2 class="font-bold text-xl">Settings</h2>
        <div v-if="!selectedPart">Please select a part</div>
        <BasePart v-else v-model:part="selectedPart" />
      </div>
      <div class="">
        <h2 class="font-bold text-xl">Preview</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1080 1512"
          id="bird"
          ref="svgRef"
          class="border shadow rounded-md"
        >
          <InlineSvg
            v-for="(part, i) in parts"
            :key="part.key"
            :svg="part.preview"
            :style="`z-index: ${i}; opacity: ${part.key === selectedPart?.key ? '1': '0.6'}`"
            width="100%"
            height="100%"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
