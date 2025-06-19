<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-2">
    <div
      v-for="(item, index) in units"
      :key="index"
      :class="[
        'tw-flex tw-items-center tw-justify-start tw-w-full tw-gap-2 tw-h-10 tw-px-3 tw-rounded-md tw-shadow-base dark:tw-shadow-none',
        { 'tw-bg-primary/base tw-text-sky/light' : false },
        { 'tw-bg-sky/lighter dark:tw-bg-transparent': true }
      ]"
      @click="onSelect(item?.prop)"
    >
      <span
        :class="[
          'tw-text-base tw-font-medium tw-text-ink/base dark:tw-text-sky/base',
          { 'tw-text-white' : false }
        ]"
      >
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'choose-unit',
  props: {
    onSelect: {
      type: Function,
      default: () => {}
    }
  },
  setup () {
    const store = useStore()
    const units = computed(() => store.getters['medications/getUnits'])

    return {
      units
    }
  }
}
</script>
