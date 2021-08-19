<template>
  <div>
    <PostWritter :post="post" @save="save" />
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
    const save = (post: IPost) => console.log("Calling the emit func", post)
    return {
      post,
      save
    }
  }
})
</script>
