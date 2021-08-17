import { createApp } from 'vue'
import axios from 'axios'
import * as mockData from './post/mocks'
import { router } from './router'
import 'highlight.js/styles/solarized-dark.css'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

//@ts-ignore
axios.get = async (url: string) => {
  if (url === '/post') {
    await delay(1000)
    return Promise.resolve({
      data: [mockData.thisMonth, mockData.thisWeek, mockData.todayPost],
    })
  }
}

import App from './App.vue'
console.log(App)

const app = createApp(App)
app.use(router)
app.mount('#app')
