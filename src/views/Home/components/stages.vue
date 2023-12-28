<template>
  <div
    v-if="steps !== null"
    class="tw-flex tw-flex-col tw-w-full tw-items-start tw-gap-1"
  >
    <span class="tw-text-sm tw-font-medium tw-text-ink/base tw-px-3">{{ label }}</span>

    <!-- Непонятное поведение tailwindcss. Классы tw-grid-cols-* работают через раз, поэтому было принято решение -->
    <!-- задавать gridTemplateColumns через inline styles. -->
    <div
      class="tw-grid tw-items-center tw-w-full tw-rounded-full tw-overflow-hidden tw-gap-px tw-bg-sky/light tw-border tw-border-sky/light"
      :style="computedStyles"
    >
      <div
        v-for="(step, index) in steps"
        :key="step"
        :class="[
          'tw-flex tw-items-center tw-justify-center tw-h-10 tw-text-sm tw-font-medium tw-text-ink/base tw-transition-colors',
          { 'tw-bg-primary/base tw-text-white tw-font-semibold' : index <= modelValue && modelValue !== null },
          { 'tw-bg-white' : index > modelValue || modelValue === null }
        ]"
        @click="$emit('update:model-value', { value: index, property })"
      >
        {{ !index ? start : (start + index) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
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
})
defineEmits(['update:model-value'])

const computedStyles = computed(() => ({ gridTemplateColumns: `repeat(${props.steps}, minmax(0, 1fr))` }))
</script>
