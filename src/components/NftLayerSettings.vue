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
    <BaseFieldText id="id" v-model.snake.lower.trim="layer.id" label="Layer name" />
    <BaseFieldText id="folderCID" v-model="layer.folderCID" label="Pinata folder CID" />
  </div>
</template>
