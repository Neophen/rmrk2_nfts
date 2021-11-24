<script setup lang="ts">
import { BasePart, BaseSettings } from './types';
import { settingsTest, nftsTest } from './features/useTest';
import NftCreate from './components/NftCreate.vue';
import NftBase from './components/NftBase.vue';
import BaseButton from './components/BaseButton.vue';

const settings = ref<BaseSettings | null>(settingsTest);
const ipfs = ref<unknown | null>(null);
const settingsAreShown = ref(false);
const nfts = ref<BasePart[] | null>(nftsTest);
const onCreate = (value: BaseSettings) => {
  settings.value = value;
};

const title = computed(() => {
  if (settings.value) {
    return `${settings.value.name}`;
  }
  return "Let's create an NFT";
});

const showSettings = (e: KeyboardEvent) => {
  if (e.code === 'ArrowLeft') {
    settingsAreShown.value = true;
  } else if (e.code === 'ArrowRight') {
    settingsAreShown.value = false;
  }
};

const onReset = () => {
  if (confirm('Are you sure you want to reset the app?')) {
    settings.value = null;
    nfts.value = null;
  }
};

const onSetTestData = () => {
  if (confirm('Are you sure? will will reset all date to the test data?')) {
    settings.value = settingsTest;
    nfts.value = nftsTest;
  }
};

onBeforeMount(async () => {
  const IPFSmodule = await import('./modules/ipfs-core/ipfs-core.js');
  const IPFS = IPFSmodule.default;
  const ipfsNode = await IPFS.create();
  ipfs.value = ipfsNode;
});

onMounted(() => {
  document.addEventListener('keyup', showSettings);
});

onBeforeUnmount(() => {
  document.removeEventListener('keyup', showSettings);
});
</script>

<template>
  <div class="p-8">
    <div class="flex items-center mb-4">
      <h1 class="text-2xl font-bold text-center">{{ title }}</h1>

      <BaseButton @click="onSetTestData" class="ml-auto"
        >SET TEST DATA</BaseButton
      >
      <BaseButton v-if="settings" @click="onReset" class="ml-4"
        >RESET</BaseButton
      >
    </div>
    <NftCreate v-if="!settings" @create="onCreate" />
    <NftBase v-else :settings="settings" v-model="nfts" :ipfs="ipfs" />
    <div
      v-if="settingsAreShown"
      class="fixed inset-0 w-full h-full text-white bg-black/75 z-[9999]"
    >
      <div class="max-h-screen overflow-y-auto">
        <pre>{{
          JSON.stringify(
            {
              settings: settings,
              nfts: nfts,
            },
            null,
            2
          )
        }}</pre>
      </div>
    </div>
  </div>
</template>
