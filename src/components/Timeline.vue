<template>
  <nav class="is-primary panel">
    <Periods
      :periods="periods"
      :selectedPeriod="selectedPeriod"
      :setPeriod="setPeriod"
    />
    <TimeLinePost :post="post" v-for="post in posts" :key="post.id" />
  </nav>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref } from 'vue'
import { IPost, Period } from '../types/types'
import moment from 'moment'
import Periods from './Periods.vue'
import TimeLinePost from './TimeLinePost.vue'
import { useStore } from '../flux/store'


export default defineComponent({
  components: {
    Periods,
    TimeLinePost
  },
  async setup() {
    const periods: Period[] = ['today', 'this week', 'this month']
    const selectedPeriod = ref<Period>('today')


    const store = useStore()
    if (!store.getState().posts.loaded) {
      await store.fetchPost()
    }
    const allPosts = store.getState().posts.ids.reduce<IPost[]>((acc, id) => {
      const post = store.getState().posts.all[id]
      return acc.concat(post)
    }, [])

    const posts: ComputedRef<IPost[]> = computed(() =>
      allPosts.filter(post => {
        if (selectedPeriod.value === 'today' && post.created.isAfter(moment().subtract(1, 'day'))) {
          return true
        }
        if (selectedPeriod.value === 'this week' && post.created.isAfter(moment().subtract(7, 'day'))) {
          return true
        }
        if (selectedPeriod.value === 'this month' && post.created.isAfter(moment().subtract(1, 'month'))) {
          return true
        }
        return false
      })
    )
    const setPeriod = (period: Period) => {
      selectedPeriod.value = period
    }

    return {
      periods,
      selectedPeriod,
      setPeriod,
      posts
    }
  }
})
</script>
