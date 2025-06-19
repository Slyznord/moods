<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-gap-[6px]">
    <span class="tw-text-sm tw-font-medium tw-text-ink/base dark:tw-text-sky/lighter tw-px-3">
      {{ label }}
    </span>

    <select-button
      :model-value="modelValue"
      :option-label="optionLabel"
      :option-value="optionValue"
      :options="options"
      :allow-empty="allowEmpty"
      :pt="ptOptions"
      @update:model-value="$emit('update:model-value', $event)"
    />
  </div>
</template>

<script>
import SelectButton from 'primevue/selectbutton'

export default {
  name: 'option-button',
  components: {
    SelectButton
  },
  props: {
    allowEmpty: {
      type: Boolean,
      default: true
    },
    modelValue: {
      type: [String, Number, Object, null],
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    optionLabel: {
      type: String,
      default: 'label'
    },
    optionValue: {
      type: [String, null],
      default: null
    },
    options: {
      type: Array,
      required: true
    }
  },
  emits: ['update:model-value'],
  setup () {
    const ptOptions = {
      root: {
        class: ['md-select-button']
      },
      button: {
        class: ['md-select-button__item']
      }
    }

    return {
      ptOptions
    }
  }
}
</script>
