import {render} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

import {DataHandler} from '.'
import {arr, data, fun, nil, num, str} from '../testUtils'

describe('DataHandler component', () => {
  it('should render properly if data is undefined', () => {
    const {container} = render(<DataHandler data={undefined} />)
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
    const {container} = render(<DataHandler data={nil} />)
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
    const {container} = render(<DataHandler data={num} />)
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          style="font-weight: bold;"
        >
          666
        </span>
      </div>
    `)
  })

  it('should render properly if data is a string', () => {
    const {container} = render(<DataHandler data={str} />)
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
    const {container} = render(<DataHandler data={fun} />)
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          style="cursor: pointer;"
        >
          <span
            style="font-weight: bold;"
          >
            fn
          </span>
        </span>
      </div>
    `)
  })

  it('should render properly if data is an object', () => {
    const {container} = render(<DataHandler data={data} />)
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
    const {container} = render(<DataHandler data={arr} />)
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
