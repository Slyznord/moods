<template>
  <div
    v-if="steps !== null"
    class="tw-flex tw-flex-col tw-w-full tw-items-start tw-gap-1"
  >
    <span class="tw-text-sm tw-font-medium tw-text-ink/base dark:tw-text-sky/lighter tw-px-3">{{ label }}</span>

    <!-- Непонятное поведение tailwindcss. Классы tw-grid-cols-* работают через раз, поэтому было принято решение -->
    <!-- задавать gridTemplateColumns через inline styles. -->
    <div
      class="tw-grid tw-items-center tw-w-full tw-rounded-full tw-overflow-hidden tw-gap-px tw-bg-sky/light dark:tw-bg-ink/darker tw-border tw-border-sky/light dark:tw-border-ink/darker tw-shadow-base"
      :style="computedStyles"
    >
      <div
        v-for="(step, index) in steps"
        :key="step"
        :class="[
          'tw-flex tw-items-center tw-justify-center tw-h-10 tw-text-sm tw-font-medium tw-text-ink/base dark:tw-text-sky/lighter tw-transition-colors',
          { 'tw-bg-primary/base tw-text-white tw-font-semibold' : index <= modelValue && modelValue !== null },
          { 'tw-bg-white dark:tw-bg-ink/darker' : index > modelValue || modelValue === null }
        ]"
        @click="$emit('update:model-value', { value: index, property })"
      >
        {{ !index ? start : (start + index) }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'

export default {
  props: {
    modelValue: {
      type: [Number, null],
      default: null
    },
    label: {
      type: String,
      default: null
    },
    property: {
      type: String,
      required: true
    },
    steps: {
      type: Number,
      required: true
    },
    start: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const { steps } = toRefs(props)

    return {
      computedStyles: computed(() => ({ gridTemplateColumns: `repeat(${steps.value}, minmax(0, 1fr))` }))
    }
  }
}
</script>
