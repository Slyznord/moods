<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-gap-1">
    <span
      v-if="label"
      class="tw-text-xs tw-font-medium tw-text-sky/dark dark:tw-text-sky/lighter"
    >
      {{ label }}
    </span>

    <dropdown
      :disabled="disabled"
      :model-value="modelValue"
      :placeholder="placeholder"
      :options="options"
      :option-label="optionLabel"
      :option-value="optionValue"
      :pt="ptOptions"
      @update:model-value="$emit('update:model-value', $event)"
    >
      <template #value="{ value }">
        <slot
          name="value"
          :value="value"
        >
          {{ value }}
        </slot>
      </template>
    </dropdown>
  </div>
</template>

<script>
import Dropdown from 'primevue/dropdown'

export default {
  name: 'select-comp',
  components: {
    Dropdown
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number, Object],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    optionLabel: {
      type: String,
      default: null
    },
    optionValue: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  setup () {
    const ptOptions = {
      root: {
        class: [
          'tw-flex tw-items-center tw-h-10 tw-border tw-border-sky/base dark:tw-border-ink/base tw-rounded-lg tw-outline-none tw-px-2 tw-gap-2 tw-min-w-[60px]',
          'tw-text-sm tw-font-regular tw-text-ink/base dark:tw-text-sky/light tw-placeholder:text-sky/dark dark:tw-placeholder:text-sky/base',
          'hover:tw-border-primary/base'
        ]
      },
      panel: {
        class: ['tw-p-2 tw-bg-white dark:tw-bg-ink/base tw-rounded-lg tw-border tw-border-sky/base dark:tw-border-ink/base tw-mt-2']
      },
      list: {
        class: ['tw-flex tw-flex-col tw-items-start tw-gap-2']
      },
      item: {
        class: ['tw-text-sm tw-font-regular tw-text-ink/base dark:tw-text-sky/lighter tw-w-full aria-selected:tw-text-primary/base aria-selected:tw-font-medium']
      }
    }

    return {
      ptOptions
    }
  }
}
</script>
