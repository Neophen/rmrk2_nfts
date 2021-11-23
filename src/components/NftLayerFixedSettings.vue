<script setup name="NftLayerFixedSettings" lang="ts">
import { BasePart } from '../types';

import BaseFieldText from './BaseFieldText.vue';
import InlineSvg from './InlineSvg.vue';

const props = defineProps<{ part: BasePart }>();
const emit = defineEmits<{
  (event: 'update:part', part: BasePart): void;
}>();

const layer = ref(props.part);

const setPreview = (part: BasePart) => {
  layer.value.preview =
    part.src?.replace('ipfs://', 'https://gateway.pinata.cloud/') || '';
};

watch(
  () => layer.value,
  (part: BasePart) => {
    emit('update:part', part);
  }
);
watch(
  () => props.part,
  (part: BasePart) => {
    layer.value = part;
  }
);
</script>
<template>
  <div class="space-y-2">
    <BaseFieldText
      id="id"
      v-model.snake.lower.trim="layer.id"
      label="Layer name"
    />
    <div>
      <p>Type: {{ layer.type }}</p>
      <p>CID: {{ layer.folderCID }}</p>
    </div>

    <div class="grid grid-cols-3 gap-1 auto-rows-min">
      <button
        type="button"
        v-for="(part, i) in layer.parts"
        class="border border-pink-500 rounded-md hover:bg-pink-100"
        @click="setPreview(part)"
      >
        <InlineSvg
          :key="part.id"
          :src="part.src?.replace('ipfs://', 'https://gateway.pinata.cloud/')"
          width="100%"
          height="100%"
        />
      </button>
    </div>
  </div>
</template>
