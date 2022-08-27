import {expect, test} from 'vitest'
import {getBySelector} from './main'

test('getBySelector works properly', () => {
  const el = document.createElement('div')
  el.id = 'something'
  el.textContent = 'hello'
  document.body.appendChild(el)
  expect(getBySelector('#something')).toMatchInlineSnapshot(`
    <div
      id="something"
    >
      hello
    </div>
  `)
  document.body.removeChild(el)
})

test('getBySelector fails properly', () => {
  expect(() => {
    getBySelector('#something')
  }).toThrowError('#something element not found.')
})
