<script setup lang="ts" name="IconButton">
import { ICONS } from '../types';
import Icon from './Icon.vue';

defineProps<{
  icon: keyof typeof ICONS;
}>();
</script>
<template>
  <button
    type="button"
    class="flex items-center justify-center w-8 h-8 text-gray-500 bg-white border border-pink-500 rounded-full hover:bg-pink-500 hover:text-white"
  >
    <Icon :icon="icon" />
  </button>
</template>
