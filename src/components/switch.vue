<template>
  <input-switch
    :disabled="disabled"
    :model-value="checked"
    :pt="ptOptions"
    @update:model-value="$emit('update:checked', $event)"
  />
</template>

<script>
import InputSwitch from 'primevue/inputswitch'

export default {
  name: 'switch',
  components: {
    InputSwitch
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      required: true
    }
  },
  setup () {
    const ptOptions = {
      root: {
        class: ['md-switch']
      },
      slider: {
        class: ['md-switch__slider']
      }
    }

    return {
      ptOptions
    }
  }
}
</script>
