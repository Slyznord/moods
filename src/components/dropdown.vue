<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-gap-1">
    <span
      v-if="label"
      class="tw-text-xs tw-font-medium tw-text-sky/dark"
    >
      {{ label }}
    </span>

    <dropdown
      :model-value="modelValue"
      :placeholder="placeholder"
      :options="options"
      :pt="ptOptions"
      @update:model-value="$emit('update:model-value', $event)"
    />
  </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown'

defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const ptOptions = {
  root: {
    class: [
      'tw-flex tw-items-center tw-h-10 tw-border tw-border-sky/base tw-rounded-lg tw-outline-none tw-px-2 tw-gap-2 tw-min-w-[60px]',
      'tw-text-sm tw-font-regular tw-text-ink/base tw-placeholder:text-sky/dark',
      'hover:tw-border-primary/base'
    ]
  },
  panel: {
    class: ['tw-p-2 tw-bg-white tw-rounded-lg tw-border tw-border-sky/base tw-mt-2']
  },
  list: {
    class: ['tw-flex tw-flex-col tw-items-start tw-gap-2']
  },
  item: {
    class: ['tw-text-sm tw-font-regular tw-text-ink/base tw-w-full aria-selected:tw-text-primary/base aria-selected:tw-font-medium']
  }
}
</script>
