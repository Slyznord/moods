<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-gap-1">
    <span class="tw-text-sm tw-font-medium tw-text-ink/base tw-px-3">{{ label }}</span>

    <select-button
      :model-value="modelValue"
      :options="options"
      :allow-empty="allowEmpty"
      :pt="pt"
      @update:model-value="$emit('update:model-value', $event)"
    />
  </div>
</template>

<script setup>
import SelectButton from 'primevue/selectbutton'

defineProps({
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
  options: {
    type: Array,
    required: true
  }
})
defineEmits(['update:model-value'])

const pt = {
  root: {
    class: ['md-select-button']
  },
  button: {
    class: ['md-select-button__item']
  }
}
</script>
