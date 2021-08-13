import { Moment } from 'moment'

export type Period = 'today' | 'this week' | 'this month'

export interface IPost {
  id: number
  title: string
  markdown: string
  html: string
  authorId: number
  created: Moment
}
