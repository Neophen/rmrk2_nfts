<script setup name="BaseModal" lang="ts">
import BaseCard from './BaseCard.vue';
defineProps<{
  show: boolean;
}>();
</script>
<template>
  <transition
    enter-from-class="opacity-0"
    enter-active-class="duration-150 ease-out"
    enter-to-class="opacity-100"
    leave-active-class="duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="
        fixed
        z-[9998]
        inset-0
        w-full
        h-full
        bg-black/50
        flex
        items-center
        justify-center
      "
    >
      <BaseCard class="w-full md:max-w-lg">
        <slot />
      </BaseCard>
    </div>
  </transition>
</template>
