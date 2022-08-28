import { render } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import data, { arr, fun, nil, num, str } from '../../mocks/data'
import Component from './index'

describe(`${Component.displayName} component`, () => {
  it('should render properly if data is undefined', () => {
    const {container} = render(<Component />)
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          style="font-weight: bold; color: purple;"
        >
          undefined
        </span>
      </div>
    `)
  })

  it('should render properly if data is null', () => {
    const {container} = render(<Component data={nil} />)
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          style="font-weight: bold; color: purple;"
        >
          null
        </span>
      </div>
    `)
  })

  it('should render properly if data is a number', () => {
    const {container} = render(<Component data={num} />)
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          style="font-weight: bold; color: orange;"
        >
          666
        </span>
      </div>
    `)
  })

  it('should render properly if data is a string', () => {
    const {container} = render(<Component data={str} />)
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          style="font-weight: bold; color: green;"
        >
          "cawabongaaa!"
        </span>
      </div>
    `)
  })

  it('should render properly if data is a function', () => {
    const {container} = render(<Component data={fun} />)
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          style="cursor: pointer;"
        >
          <span
            style="font-weight: bold; color: magenta;"
          >
            fn
          </span>
        </span>
      </div>
    `)
  })

  it('should render properly if data is an object', () => {
    const {container} = render(<Component data={data} />)
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span>
          <span
            style="font-weight: bold; color: inherit;"
          >
            {
          </span>
          <span
            style="cursor: pointer;"
          >
            <span
              style="font-weight: bold; color: inherit;"
            >
              ...
            </span>
          </span>
          <span
            style="font-weight: bold; color: inherit;"
          >
            }
          </span>
        </span>
      </div>
    `)
  })

  it('should render properly if data is an array', () => {
    const {container} = render(<Component data={arr} />)
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span>
          <span
            style="font-weight: bold; color: inherit;"
          >
            [
          </span>
          <span
            style="cursor: pointer;"
          >
            <span
              style="font-weight: bold; color: inherit;"
            >
              ...
            </span>
          </span>
          <span
            style="font-weight: bold; color: inherit;"
          >
            ]
          </span>
        </span>
      </div>
    `)
  })
})
