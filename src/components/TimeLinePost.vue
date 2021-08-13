<template>
  <a data-test="post" href="/" class="panel-block">
    <div>
      <a href="/">{{ post.title }}</a>
      <div>{{ post.created.format("DD MM") }}</div>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent, ComputedRef } from 'vue'
import { IPost } from '../types/types'
export default defineComponent({
  props: {
    post: {
      type: Object as () => IPost,
      required: true
    }
  }
})
</script>
