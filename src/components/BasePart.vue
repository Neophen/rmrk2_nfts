<script setup name="BasePart" lang="ts">
import { NftPart } from '../types';

const props = defineProps<{ part: NftPart }>();
const emit = defineEmits<{
  (event: 'update:part', part: NftPart): void;
  (event: 'delete'): void;
}>();

const myPart = ref(props.part);
const locked = ref(false);

const setType = (type: 'fixed' | 'slot') => {
  myPart.value.type = type;
};

const onDelete = () => {
  emit('delete');
};
const onLock = () => {
  locked.value = true;
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  const file = target.files[0];
  const fr = new FileReader();
  fr.onload = (event) => {
    myPart.value.preview = event.target.result;
  };
  fr.readAsText(file);
};

watch(
  () => myPart.value,
  (part: NftPart) => {
    console.log('part changed');
    emit('update:part', part);
  }
);
watch(
  () => props.part,
  (part: NftPart) => {
    myPart.value = part;
  }
);

// id: string;
// type: "slot" | "fixed";
// equippable?: string[] | "*";
// unequip?: "unequip" | "burn";
// z?: number;
// src?: string;
</script>
<template>
  <div class="p-2 space-y-2 border rounded-md shadow">
    <div class="flex items-center p-1 bg-pink-500 rounded-md">
      <button
        type="button"
        @click="setType('fixed')"
        class="flex-1 py-1 text-center rounded-md"
        :class="{
          'bg-white text-pink-500 hover:bg-pink-50': myPart.type === 'fixed',
          'bg-pink-500 text-white hover:bg-pink-600': myPart.type !== 'fixed',
        }"
      >
        Fixed
      </button>
      <button
        type="button"
        @click="setType('slot')"
        class="flex-1 py-1 text-center rounded-md"
        :class="{
          'bg-white text-pink-500 hover:bg-pink-50': myPart.type === 'slot',
          'bg-pink-500 text-white hover:bg-pink-600': myPart.type !== 'slot',
        }"
      >
        Slot
      </button>
    </div>
    <div>
      <label for="id" class="block text-xs text-gray-500 uppercase">ID</label>
      <input
        type="text"
        name="id"
        id="id"
        class="block w-full px-2 py-1 border border-pink-500 rounded-md"
        v-model="myPart.id"
      />
    </div>
    <div>
      <label for="preview" class="block text-xs text-gray-500 uppercase"
        >preview</label
      >
      <input
        type="file"
        name="preview"
        id="preview"
        class="block w-full px-2 py-1 border border-pink-500 rounded-md"
        @change="onFileChange"
        accept="image/svg"
      />
    </div>
    <div>
      <label for="src" class="block text-xs text-gray-500 uppercase">src</label>
      <input
        type="text"
        name="src"
        id="src"
        class="block w-full px-2 py-1 border border-pink-500 rounded-md"
        v-model="myPart.src"
      />
    </div>
    <div class="flex items-center space-x-4">
      <button
        type="button"
        class="w-full py-1 border border-pink-500 rounded-md hover:bg-pink-100"
        @click="onLock"
      >
        Lock
      </button>
      <button
        type="button"
        class="w-full py-1 border border-pink-500 rounded-md hover:bg-pink-100"
        @click="onDelete"
      >
        Delete
      </button>
    </div>
  </div>
</template>
