<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-2">
    <div
      v-for="(item, index) in availableLocales"
      :key="index"
      :class="[
        'tw-flex tw-items-center tw-justify-start tw-w-full tw-gap-2 tw-h-10 tw-px-3 tw-rounded-md tw-shadow-base dark:tw-shadow-none',
        { 'tw-bg-primary/base tw-text-sky/light' : item === locale },
        { 'tw-bg-sky/lighter dark:tw-bg-transparent' : item !== locale }
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
</template>

<script>
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useVfm } from 'vue-final-modal'

export default {
  name: 'choose-language',
  setup () {
    const store = useStore()
    const vfm = useVfm()
    const { availableLocales, locale } = useI18n()
    const locales = computed(() => store.getters['localization/getLocales'])

    function onSelectLanguage (item) {
      store.dispatch('localization/onChangeLanguage', item)
      vfm.close('choose-option')
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
