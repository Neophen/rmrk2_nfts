<script setup name="Icon" lang="ts">
import { ICONS } from '../types';

enum ICON_SIZE {
  DEFAULT = 'default',
}

const SIZE_TO_CLASS = {
  [ICON_SIZE.DEFAULT]: 'w-4 h-4',
};

const props = defineProps<{ icon: keyof typeof ICONS; size?: ICON_SIZE }>();
const iconPath = computed(() => `/icons.svg#${props.icon}`);
const iconClass = computed(
  () => SIZE_TO_CLASS[props.size || ICON_SIZE.DEFAULT]
);
</script>

<template>
  <svg class="fill-current" :class="iconClass">
    <use :href="iconPath" :xlink:href="iconPath" />
  </svg>
</template>
