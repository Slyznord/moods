<template>
  <vue-final-modal
    modal-id="choose-option"
    class="md-modal-root"
    content-class="md-modal-content"
    overlay-class="md-modal-overlay"
    lock-scroll
    click-to-close
    swipe-to-close="down"
    content-transition="vfm-slide-down"
    @click-outside="$emit('update:model-value', false)"
    @closed="$emit('update:model-value', false)"
  >
    <template #default>
      <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-6">
        <h2
          v-if="headline"
          class="tw-text-lg tw-font-semibold tw-text-ink/dark dark:tw-text-sky/lighter"
        >
          {{ headline }}
        </h2>

        <slot name="options" />
      </div>

      <div class="md-modal-line" />
    </template>
  </vue-final-modal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'

export default {
  name: 'choose-option-modal',
  components: {
    VueFinalModal
  },
  props: {
    headline: {
      type: String,
      default: ''
    }
  },
  emits: ['update:model-value']
}
</script>
