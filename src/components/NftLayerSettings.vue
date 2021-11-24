<script setup name="NftLayerSettings" lang="ts">
import { BasePart } from '../types';

import BaseFieldText from './BaseFieldText.vue';
import BaseFieldGroupSelect from './BaseFieldGroupSelect.vue';

const props = defineProps<{ part: BasePart }>();
const emit = defineEmits<{
  (event: 'update:part', part: BasePart): void;
  (event: 'delete'): void;
}>();

const layer = ref(props.part);

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
    <BaseFieldGroupSelect v-model="layer.type" :options="['fixed', 'slot']" />
    <BaseFieldText
      id="id"
      v-model.snake.lower.trim="layer.id"
      label="Layer name"
    />
    <BaseFieldText
      id="folderCID"
      v-model="layer.folderCID"
      label="Pinata folder CID"
    />
    <p>You can play around with these CIDs</p>
    <ul class="list-disc">
      <li>
        <p class="text-xs text-gray-400">Body:</p>
        QmTExChjATHPC2Y4Q8pxSBRaekSxhVMyDqVuKrf4R4vNVh
      </li>
      <li>
        <p class="text-xs text-gray-400">Head:</p>
        QmQbpuw7bFS3mbCtc4xN1aBywcMziNGa77bK9GVuaERVmF
      </li>
      <li>
        <p class="text-xs text-gray-400">Items (SLOT):</p>
        QmcjzMokrHxzo7W1bC8UwzfLMgz4v5ighGwddfyyZKcGfi
      </li>
      <li>
        <p class="text-xs text-gray-400">Hands:</p>
        QmSWa3PcwSP5d3GjKoqr2ez92hMzxJuTKwj7miVpmCnPuF
      </li>
    </ul>
  </div>
</template>
