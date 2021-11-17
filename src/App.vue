<script setup lang="ts">
import { BaseSettings } from './types';
import NftCreate from './components/NftCreate.vue';
import NftBase from './components/NftBase.vue';

const settings = ref<BaseSettings | null>(null);

const onCreate = (value: BaseSettings) => {
  settings.value = value;
};

const title = computed(() => {
  if (settings.value) {
    return `${settings.value.name}`;
  }
  return "Let's create an NFT";
});
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold text-center">{{ title }}</h1>
    <NftCreate v-if="!settings" @create="onCreate" />
    <NftBase v-else :settings="settings" />
  </div>
</template>
