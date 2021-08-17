<template>
  <div>
    <PostWritter :post="post" />
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { defineComponent } from 'vue'
import PostWritter from '../components/NewPost.vue'
import { IPost } from '../types/types'
export default defineComponent({
  name: "NewPost",
  components: {
    PostWritter
  },
  setup() {
    const post: IPost = {
      id: -12,
      title: 'first Post',
      markdown: '## New Post  \n First Post goes here',
      html: '',
      authorId: 12,
      created: moment()
    }
    return {
      post
    }
  }
})
</script>
