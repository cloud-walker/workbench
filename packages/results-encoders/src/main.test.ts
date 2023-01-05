import {expect, test} from 'vitest'

import {makeResultsEncoders} from './main.js'

type Todo = {
  id: number
  content: string
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}

const encoders = makeResultsEncoders<Todo>({
  fieldsEncodings: {
    content: 'cn',
  },
})
const {resultsFilters, fieldsFilters, fieldsSortings, resultsSortings} =
  encoders

test('api', () => {
  expect(encoders).toHaveProperty('resultsFilters')
  expect(encoders).toHaveProperty('resultsSortings')
  expect(encoders).toHaveProperty('fieldsFilters')
  expect(encoders).toHaveProperty('fieldsSortings')

  expect(resultsFilters).toHaveProperty('encode')
  expect(resultsFilters).toHaveProperty('decode')

  expect(resultsSortings).toHaveProperty('encode')
  expect(resultsSortings).toHaveProperty('decode')

  expect(fieldsFilters).toHaveProperty('encode')
  expect(fieldsFilters).toHaveProperty('decode')

  expect(fieldsSortings).toHaveProperty('encode')
  expect(fieldsSortings).toHaveProperty('decode')
})
