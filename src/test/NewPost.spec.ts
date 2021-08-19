import { mount } from '@vue/test-utils'
import NewPost from '../components/NewPost.vue'
import { basePost } from '../post/mocks'

describe('NewPost', () => {
  it('computes a post and emits the data', (done) => {
    const wrapper = mount(NewPost, {
      props: {
        post: {
          ...basePost,
        },
      },
    })
    wrapper.find('[data-test="post-title"]').setValue('New Post title')
    wrapper.find<HTMLDivElement>('[data-test="markdown"]').element.innerText =
      '### Content'

    setTimeout(() => {
      wrapper.find<HTMLDivElement>('[data-test="markdown"]').trigger('input')
      wrapper.find('[data-test="submit-test"]').trigger('click')
      expect(wrapper.emitted().save[0][0].title).toBe('New Post title')
      expect(wrapper.emitted().save[0][0].markdown).toBe('### Content')
      expect(wrapper.emitted().save[0][0].html).toBe('<p>Content</p>\n')
      done()
    }, 500)
  })
})
