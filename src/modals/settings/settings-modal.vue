<template>
  <vue-final-modal
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
      <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-5">
        <div class="tw-flex tw-flex-col tw-items-start tw-gap-2 tw-w-full">
          <h2 class="tw-text-lg tw-font-semibold tw-text-ink/dark dark:tw-text-sky/lighter">
            {{ $t('message.theme') }}
          </h2>

          <div class="tw-flex tw-items-center tw-justify-between tw-w-full">
            <span class="tw-text-base tw-font-medium tw-text-ink/base dark:tw-text-sky/base">{{ $t('message.theme_dark') }}</span>

            <switch-primary
              :checked="darkMode"
              @update:checked="setColorMode($event)"
            />
          </div>
        </div>

        <div class="tw-flex tw-flex-col tw-items-start tw-gap-2 tw-w-full">
          <h2 class="tw-text-lg tw-font-semibold tw-text-ink/dark dark:tw-text-sky/base">
            {{ $t('message.language') }}
          </h2>

          <div
            class="tw-flex tw-items-center tw-justify-start tw-w-full tw-gap-3"
            @click="openChooseLanguageModal"
          >
            <img
              :src="locales[locale].icon"
              alt="language icon"
            >

            <span class="tw-text-base tw-font-medium tw-text-ink/base dark:tw-text-sky/base">
              {{ locales[locale].label }}
            </span>
          </div>
        </div>
      </div>

      <div class="md-modal-line" />
    </template>
  </vue-final-modal>
</template>

<script>
import ChooseOption from '@/modals/choose-option/choose-option-modal.vue'
import ChooseLanguage from '@/components/choose-language.vue'
import SwitchPrimary from '@/components/switch.vue'

import { VueFinalModal, useModal } from 'vue-final-modal'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import i18n from '@/i18n.js'

export default {
  name: 'settings-modal',
  components: {
    SwitchPrimary,
    VueFinalModal
  },
  emits: ['update:model-value'],
  setup () {
    const store = useStore()
    const { locale } = useI18n()
    const { open: openChooseLanguageModal } = useModal({
      component: ChooseOption,
      attrs: {
        headline: i18n.global.t('message.choose_language')
      },
      slots: {
        options: ChooseLanguage
      }
    })

    return {
      darkMode: computed(() => store.state.darkMode),
      locale,
      locales: computed(() => store.getters.getLocales),
      openChooseLanguageModal,
      setColorMode: (payload) => store.commit('setColorMode', payload)
    }
  }
}
</script>
