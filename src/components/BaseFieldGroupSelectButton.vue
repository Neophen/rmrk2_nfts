<script setup lang="ts" name="BaseFieldGroupSelectButton">
defineProps<{
  option: string;
  selected: string;
}>();
</script>
<template>
  <button
    type="button"
    class="flex-1 py-1 text-center capitalize rounded-md"
    :class="{
      'bg-white text-pink-500 hover:bg-pink-50': selected === option,
      'bg-pink-500 text-white hover:bg-pink-600': selected !== option,
    }"
  >
    {{ option }}
  </button>
</template>
