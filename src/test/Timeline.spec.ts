import { mount } from '@vue/test-utils'
import Home from '../pages/Home.vue'
import flushPromises from 'flush-promises'

import * as mockData from '../post/mocks'

jest.mock('axios', () => ({
  get: (url: string) => ({
    data: [mockData.thisMonth, mockData.thisWeek, mockData.todayPost],
  }),
}))

describe('Home', () => {
  it('renders 3 time periods', async () => {
    const wrapper = mount(Home)
    await flushPromises()
    expect(wrapper.findAll('[data-test="period"]')).toHaveLength(3)
  })
  it('updates the period marked as active', async () => {
    const wrapper = mount(Home)
    await flushPromises()
    const $today = wrapper.findAll('[data-test="period"]')[0]
    expect($today.classes()).toContain('is-active')

    const $thisWeek = wrapper.findAll('[data-test="period"]')[1]
    await $thisWeek.trigger('click')

    expect($today.classes()).not.toContain('is-active')
    expect($thisWeek.classes()).toContain('is-active')

    const $thisMonth = wrapper.findAll('[data-test="period"]')[2]
    await $thisMonth.trigger('click')

    expect($today.classes()).not.toContain('is-active')
    expect($thisWeek.classes()).not.toContain('is-active')
    expect($thisMonth.classes()).toContain('is-active')
  })
  it('renders todays post by default', async () => {
    const wrapper = mount(Home)
    await flushPromises()
    expect(wrapper.findAll('[data-test="post"]')).toHaveLength(1)
    const $thisWeek = wrapper.findAll('[data-test="period"]')[1]
    await $thisWeek.trigger('click')
    expect(wrapper.findAll('[data-test="post"]')).toHaveLength(2)
    const $thisMonth = wrapper.findAll('[data-test="period"]')[2]
    await $thisMonth.trigger('click')
    expect(wrapper.findAll('[data-test="post"]')).toHaveLength(3)
  })
})
