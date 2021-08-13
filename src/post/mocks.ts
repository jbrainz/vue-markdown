import moment from 'moment'
import { IPost } from '../types/types'

export const basePost: IPost = {
  id: 1,
  title: 'Base Post',
  markdown: 'Content',
  html: '<p>Content</p>',
  authorId: 1,
  created: moment(),
}

export const todayPost: IPost = {
  ...basePost,
  id: 1,
  title: 'Today',
}

export const thisWeek: IPost = {
  ...basePost,
  id: 2,
  title: 'This week',
  created: moment().subtract(2, 'days'),
}

export const thisMonth: IPost = {
  ...basePost,
  id: 3,
  title: 'This month',
  created: moment().subtract(2, 'weeks'),
}
