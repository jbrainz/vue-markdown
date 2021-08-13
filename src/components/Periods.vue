<template>
  <p class="panel-tabs">
    <a
      data-test="period"
      href=""
      v-for="(period, index) in periods"
      :key="index"
      :class="[period === selectedPeriod ? 'is-active' : '']"
      @click.prevent="setPeriod(period)"
      >{{ period }}</a
    >
  </p>
</template>


<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IPost, Period } from '../types/types'

export default defineComponent({
  name: "Periods",
  props: {
    periods: Array as PropType<Period[]>,
    selectedPeriod: String as PropType<Period>,
    setPeriod: Function
  },
})
</script>
