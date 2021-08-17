import { reactive, readonly } from '@vue/reactivity'
import axios from 'axios'
import { IPost } from '../types/types'

interface IPostsState {
  ids: readonly string[]
  all: Record<string, IPost>
  loaded: boolean
}

interface IState {
  posts: IPostsState
}

const initialPostsState = (): IPostsState => ({
  all: {},
  ids: [],
  loaded: false,
})

const initialState = (): IState => ({
  posts: initialPostsState(),
})

class Store {
  protected state: IState
  constructor(initialState: IState) {
    this.state = reactive(initialState)
  }
  public getState(): IState {
    return this.state
  }

  async fetchPost() {
    const res = await axios.get<IPost[]>('/post')
    const ids: string[] = []
    const all: Record<string, IPost> = {}
    for (const post of res.data) {
      ids.push(post.id.toString())
      all[post.id] = post
    }
    this.state.posts = {
      ids,
      all,
      loaded: true,
    }
  }
}

const store = new Store(initialState())
store.getState()

export const useStore = () => store
