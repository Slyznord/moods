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
import { useI18n } from 'vue-i18n'
import { VueFinalModal } from 'vue-final-modal'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'choose-language-modal',
  components: {
    VueFinalModal
  },
  props: {
    headline: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  setup (props, { emit }) {
    const store = useStore()
    const { availableLocales, locale } = useI18n()
    const locales = computed(() => store.getters.getLocales)

    function onSelectLanguage (item) {
      store.commit('setLanguage', item)
      emit('update:model-value', false)
    }

    return {
      availableLocales,
      locale,
      locales,
      onSelectLanguage
    }
  }
}
</script>
