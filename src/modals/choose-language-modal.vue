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
      <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-6">
        <h2 class="tw-text-lg tw-font-semibold tw-text-ink/dark dark:tw-text-sky/lighter">{{ $t('message.choose_language') }}</h2>

        <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-2">
          <div
            v-for="(item, index) in availableLocales"
            :key="index"
            :class="[
              'tw-flex tw-items-center tw-justify-start tw-w-full tw-gap-2 tw-h-10 tw-px-2 tw-rounded-md',
              { 'tw-bg-primary/base' : item === locale }
            ]"
            @click="onSelectLanguage(item)"
          >
            <img
              :src="locales[item].icon"
              alt="language icon"
            >

            <span
              :class="[
                'tw-text-base tw-font-medium tw-text-ink/base dark:tw-text-sky/base',
                { 'tw-text-white' : item === locale }
              ]"
            >
              {{ locales[item].label }}
            </span>
          </div>
        </div>
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
