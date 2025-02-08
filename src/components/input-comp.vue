<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-1">
    <span
      v-if="label"
      class="tw-text-xs tw-font-medium tw-text-sky/dark dark:tw-text-sky/dark"
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

<script>
import InputText from 'primevue/inputtext'

export default {
  name: 'input-comp',
  components: {
    InputText
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
      type: [String, Number],
      default: ''
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
          'tw-w-full tw-h-10 tw-border tw-border-sky/base dark:tw-border-ink/dark dark:tw-bg-ink/darker tw-rounded-lg tw-outline-none tw-px-3',
          'tw-text-sm tw-font-regular tw-text-ink/base dark:tw-text-sky/light tw-placeholder:text-sky/dark dark:tw-placeholder:text-sky/base',
          'focus:tw-border-primary/base'
        ]
      }
    }

    return {
      ptOptions
    }
  }
}
</script>
