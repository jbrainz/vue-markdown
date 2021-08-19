<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="label">Post Title</div>
          <div class="control">
            <input
              type="text"
              class="input"
              v-model="title"
              data-test="post-title"
            />
            {{ title }}
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-half">
        <div
          contenteditable
          id="markdown"
          ref="contentEditable"
          @input="handleEdit"
          data-test="markdown"
        />
      </div>
      <div class="column is-one-half">
        <div v-html="html" />
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <button
          @click="submit"
          class="button is-primary is-pulled-right"
          data-test="submit-test"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { IPost } from '../types/types'
import { parse, MarkedOptions } from 'marked'
import { highlightAuto } from 'highlight.js'
import { debounce } from 'lodash'
export default defineComponent({
  name: "PostWritter",
  props: {
    post: {
      type: Object as () => IPost,
      required: true
    }
  },
  emits: ['save'],
  setup(props, ctx) {
    const title = ref(props.post.title)
    const contentEditable = ref<null | HTMLDivElement>(null)
    const markdown = ref(props.post.markdown)
    const html = ref('')

    const options: MarkedOptions = {
      highlight: (code: string) => highlightAuto(code).value
    }
    const handleEdit = () => {
      markdown.value = contentEditable.value.innerText
    }

    const submit = () => {
      const post: IPost = {
        ...props.post,
        title: title.value,
        markdown: markdown.value,
        html: html.value
      }
      ctx.emit('save', post)
    }
    const update = (value: string) => { html.value = parse(value, options) }
    watch(() => markdown.value, debounce(update, 500), { immediate: true })
    console.log(contentEditable.value)
    onMounted(() => {
      contentEditable.value.innerText = markdown.value
    })
    return { title, contentEditable, handleEdit, markdown, html, submit }
  }
})
</script>
