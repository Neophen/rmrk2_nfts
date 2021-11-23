<script setup name="NftLayerSettings" lang="ts">
import { BasePart } from '../types';

import BaseFieldText from './BaseFieldText.vue';
import BaseFieldFile from './BaseFieldFile.vue';
import BaseFieldGroupSelect from './BaseFieldGroupSelect.vue';

const props = defineProps<{ part: BasePart }>();
const emit = defineEmits<{
  (event: 'update:part', part: BasePart): void;
  (event: 'delete'): void;
}>();

const layer = ref(props.part);

const onFileChange = (files: FileList) => {
  const file = files[0];
  const fr = new FileReader();
  fr.onload = (event: ProgressEvent<FileReader>) => {
    layer.value.preview = event.target?.result as string;
  };
  fr.readAsText(file);
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
    <BaseFieldGroupSelect v-model="layer.type" :options="['fixed', 'slot']" />
    <BaseFieldText id="id" v-model.snake.lower.trim="layer.id" label="Layer name" />
    <BaseFieldFile
      id="preview"
      label="Preview"
      @change="onFileChange"
      accept="image/svg"
    />
    <BaseFieldText id="folderCID" v-model="layer.folderCID" label="Pinata folder CID" />
  </div>
</template>
