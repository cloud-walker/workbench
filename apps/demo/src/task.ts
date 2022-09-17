import {faker} from '@faker-js/faker'
import {nanoid} from 'nanoid'

export type Task = {
  id: string
  content: string
  categories: string[]
  isCompleted: boolean
  estimate: number
  createdAt: Date
  updatedAt: Date
}

export function makeTask(): Task {
  const updatedAt = faker.date.recent()
  const createdAt = faker.date.recent(5, updatedAt)
  return {
    id: nanoid(),
    categories: faker.helpers.uniqueArray(faker.animal.type, 5),
    content: faker.random.words(),
    createdAt,
    updatedAt,
    estimate: faker.datatype.number({min: 1}),
    isCompleted: faker.datatype.boolean(),
  }
}
