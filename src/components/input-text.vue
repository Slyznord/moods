<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-1">
    <span
      v-if="label"
      class="tw-text-xs tw-font-medium tw-text-sky/dark"
    >
      {{ label }}
    </span>

    <input-text
      :disabled="disabled"
      :model-value="modelValue"
      :placeholder="placeholder"
      :pt="ptOptions"
      @update:model-value="$emit('update:model-value', $event)"
    />
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'

defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const ptOptions = {
  root: {
    class: [
      'tw-w-full tw-h-10 tw-border tw-border-sky/base tw-rounded-lg tw-outline-none tw-px-3',
      'tw-text-sm tw-font-regular tw-text-ink/base tw-placeholder:text-sky/dark',
      'focus:tw-border-primary/base'
    ]
  }
}
</script>
