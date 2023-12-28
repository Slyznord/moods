<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${viewBoxSize[0]} ${viewBoxSize[1]}`"
    role="presentation"
  >
    <g
      v-if="isIconArray"
      :fill="fill"
    >
      <path
        v-for="(path) in icon"
        :d="path"
        :key="path"
        :stroke-width="strokeWidth"
        :stroke-linecap="strokeLinecap"
        :stroke-linejoin="strokeLinejoin"
        :stroke="strokeColor"
      />
    </g>

    <g
      v-else
      v-html="icon"
      :fill="fill"
    ></g>
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  fill: {
    type: String,
    default: 'none'
  },
  height: {
    type: [Number, String],
    default: 24
  },
  icon: {
    type: String,
    required: true
  },
  strokeColor: {
    type: String,
    default: ''
  },
  strokeLinecap: {
    type: [Number, String],
    default: ''
  },
  strokeLinejoin: {
    type: String,
    default: ''
  },
  strokeWidth: {
    type: [Number, String],
    default: 0
  },
  viewBoxSize: {
    type: Array,
    default: () => [24, 24]
  },
  width: {
    type: [Number, String],
    default: 24
  }
})
const isIconArray = computed(() => Array.isArray(props.icon))
</script>
