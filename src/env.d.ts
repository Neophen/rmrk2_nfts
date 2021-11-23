/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
  }

  // Generated by 'unplugin-auto-import'
  // We suggest you to commit this file into source control
  import type {
      ComputedRef as __ComputedRef,
      Ref as __Ref
    } from 'vue'

    declare global {
      type ComputedRef<T> = __ComputedRef<T>
      type Ref<T> = __Ref<T>
      const computed: typeof import('vue')['computed']
      const ref: typeof import('vue')['ref']
      const reactive: typeof import('vue')['reactive']
      const onBeforeMount: typeof import('vue')['onBeforeMount']
      const onMounted: typeof import('vue')['onMounted']
      const onBeforeUnmount: typeof import('vue')['onBeforeUnmount']
      const watch: typeof import('vue')['watch']
      const nextTick: typeof import('vue')['nextTick']
    }
    export{}
