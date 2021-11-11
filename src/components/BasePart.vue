<script setup name="BasePart" lang="ts">
import { IBasePart } from 'rmrk-tools/dist/classes/base';

const props = defineProps<{ part: IBasePart }>();
const emit = defineEmits<{
  (event: 'update:part', part: IBasePart): void;
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
  (part: IBasePart) => {
    console.log('part changed');
    emit('update:part', part);
  }
);
watch(
  () => props.part,
  (part: IBasePart) => {
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
  <div class="border shadow rounded-md p-2 space-y-2">
    <div class="bg-pink-500 flex items-center rounded-md p-1">
      <button
        type="button"
        @click="setType('fixed')"
        class="rounded-md text-center flex-1 py-1"
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
        class="rounded-md text-center flex-1 py-1"
        :class="{
          'bg-white text-pink-500 hover:bg-pink-50': myPart.type === 'slot',
          'bg-pink-500 text-white hover:bg-pink-600': myPart.type !== 'slot',
        }"
      >
        Slot
      </button>
    </div>
    <div>
      <label for="id" class="block uppercase text-gray-500 text-xs">ID</label>
      <input
        type="text"
        name="id"
        id="id"
        class="block rounded-md px-2 py-1 border border-pink-500 w-full"
        v-model="myPart.id"
      />
    </div>
    <div>
      <label for="preview" class="block uppercase text-gray-500 text-xs"
        >preview</label
      >
      <input
        type="file"
        name="preview"
        id="preview"
        class="block rounded-md px-2 py-1 border border-pink-500 w-full"
        @change="onFileChange"
        accept="image/svg"
      />
    </div>
    <div>
      <label for="src" class="block uppercase text-gray-500 text-xs">src</label>
      <input
        type="text"
        name="src"
        id="src"
        class="block rounded-md px-2 py-1 border border-pink-500 w-full"
        v-model="myPart.src"
      />
    </div>
    <div class="flex items-center space-x-4">
      <button
        type="button"
        class="w-full py-1 rounded-md border border-pink-500 hover:bg-pink-100"
        @click="onLock"
      >
        Lock
      </button>
      <button
        type="button"
        class="w-full py-1 rounded-md border border-pink-500 hover:bg-pink-100"
        @click="onDelete"
      >
        Delete
      </button>
    </div>
  </div>
</template>
