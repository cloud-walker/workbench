import {faker} from '@faker-js/faker'
import {nanoid} from 'nanoid'

faker.seed(123)

export type Task = {
  id: string
  content: string
  categories: string[]
  isCompleted: boolean
  estimate: number
  createdAt: Date
  updatedAt: Date
}

export const task2FiltersOperators = {
  // id: [],
  categories: ['any_of', 'none_of'],
  content: ['like', 'unlike'],
  // createdAt: [],
  // estimate: [],
  // isCompleted: [],
  // updatedAt: [],
} as const satisfies Partial<Record<keyof Task, readonly string[]>>

export type TaskFilter = {
  [k in keyof typeof task2FiltersOperators]: {
    field: k
    operator: (typeof task2FiltersOperators)[k][number]
    value: Task[k]
  }
}[keyof typeof task2FiltersOperators]

export const makeTask = (): Task => {
  const updatedAt = faker.date.recent()
  const createdAt = faker.date.recent({days: 5, refDate: updatedAt})
  return {
    id: nanoid(),
    categories: faker.helpers.uniqueArray(faker.animal.type, 5),
    content: faker.lorem.words(),
    createdAt,
    updatedAt,
    estimate: faker.number.int({min: 1}),
    isCompleted: faker.datatype.boolean(),
  }
}
