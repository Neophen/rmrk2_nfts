<script setup lang="ts">
import { BasePart, BaseSettings } from './types';
import NftCreate from './components/NftCreate.vue';
import NftBase from './components/NftBase.vue';

const settings = ref<BaseSettings | null>(null);
const ipfs = ref<unknown | null>(null);
const settingsAreShown = ref(false);
const nft = ref<BasePart[] | null>(null);
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
    <h1 class="text-2xl font-bold text-center">{{ title }}</h1>
    <NftCreate v-if="!settings" @create="onCreate" />
    <NftBase v-else :settings="settings" v-model="nft" :ipfs="ipfs" />
    <div
      v-if="settingsAreShown"
      class="fixed inset-0 w-full h-full text-white bg-black/75 z-[9999]"
    >
      <div class="max-h-screen overflow-y-auto">
        <pre>{{
          JSON.stringify(
            {
              settings: settings,
              nft: nft,
            },
            null,
            2
          )
        }}</pre>
      </div>
    </div>
  </div>
</template>
