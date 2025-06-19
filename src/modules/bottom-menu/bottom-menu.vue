<template>
  <div class="tw-flex tw-items-center tw-justify-center tw-fixed tw-bottom-6 tw-w-full tw-px-2 min-[375px]:tw-px-4 tw-max-h-[72px]">
    <div class="tw-flex tw-items-center tw-justify-center tw-w-full tw-px-4 tw-py-3 tw-bg-white dark:tw-bg-ink/darker tw-gap-2 min-[375px]:tw-gap-6 tw-rounded-xl tw-shadow-base">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'bottom-menu'
}
</script>
