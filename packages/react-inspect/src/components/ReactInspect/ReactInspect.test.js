import {render} from '@testing-library/react'
import React from 'react'

import data, {circ} from '../../mocks/data'
import Component from './index'

/* eslint-env jest */
describe(`${Component.displayName} component`, () => {
  it('should render properly', () => {
    const {container} = render(<Component data={data} />)
    expect(container).toMatchInlineSnapshot(`
      <div>
        <pre
          style="line-height: 1.25; font-size: 1.25rem; font-family: monospace; padding: 0.75rem; display: inline-block; background-color: transparent;"
        >
          <span>
            <span
              style="font-weight: bold;"
            >
              {
            </span>
            <div
              style="padding-left: 1rem;"
            >
              <span
                style="font-weight: bold; color: rgb(119, 119, 119);"
              >
                und
              </span>
              <span
                style="font-weight: bold;"
              >
                :
              </span>
               
              <span
                style="font-weight: bold; color: purple;"
              >
                undefined
              </span>
            </div>
            <div
              style="padding-left: 1rem;"
            >
              <span
                style="font-weight: bold; color: rgb(119, 119, 119);"
              >
                nil
              </span>
              <span
                style="font-weight: bold;"
              >
                :
              </span>
               
              <span
                style="font-weight: bold; color: purple;"
              >
                null
              </span>
            </div>
            <div
              style="padding-left: 1rem;"
            >
              <span
                style="font-weight: bold; color: rgb(119, 119, 119);"
              >
                num
              </span>
              <span
                style="font-weight: bold;"
              >
                :
              </span>
               
              <span
                style="font-weight: bold; color: orange;"
              >
                666
              </span>
            </div>
            <div
              style="padding-left: 1rem;"
            >
              <span
                style="font-weight: bold; color: rgb(119, 119, 119);"
              >
                str
              </span>
              <span
                style="font-weight: bold;"
              >
                :
              </span>
               
              <span
                style="font-weight: bold; color: green;"
              >
                "cawabongaaa!"
              </span>
            </div>
            <div
              style="padding-left: 1rem;"
            >
              <span
                style="font-weight: bold; color: rgb(119, 119, 119);"
              >
                fun
              </span>
              <span
                style="font-weight: bold;"
              >
                :
              </span>
               
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
            <div
              style="padding-left: 1rem;"
            >
              <span
                style="font-weight: bold; color: rgb(119, 119, 119);"
              >
                arr
              </span>
              <span
                style="font-weight: bold;"
              >
                :
              </span>
               
              <span>
                <span
                  style="font-weight: bold;"
                >
                  [
                </span>
                <span
                  style="cursor: pointer;"
                >
                  <span
                    style="font-weight: bold;"
                  >
                    ...
                  </span>
                </span>
                <span
                  style="font-weight: bold;"
                >
                  ]
                </span>
              </span>
            </div>
            <div
              style="padding-left: 1rem;"
            >
              <span
                style="font-weight: bold; color: rgb(119, 119, 119);"
              >
                obj
              </span>
              <span
                style="font-weight: bold;"
              >
                :
              </span>
               
              <span>
                <span
                  style="font-weight: bold;"
                >
                  {
                </span>
                <span
                  style="cursor: pointer;"
                >
                  <span
                    style="font-weight: bold;"
                  >
                    ...
                  </span>
                </span>
                <span
                  style="font-weight: bold;"
                >
                  }
                </span>
              </span>
            </div>
            <span
              style="font-weight: bold;"
            >
              }
            </span>
          </span>
        </pre>
      </div>
    `)
  })

  it('should throw an error if the data is circular', () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn)
    expect(() => render(<Component data={circ} />)).toThrowError()
    jest.restoreAllMocks()
  })
})
