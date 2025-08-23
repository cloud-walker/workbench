import {render} from '@testing-library/react'
import {describe, expect, it, vi} from 'vitest'
import {circ, data} from '../testUtils'
import {Inspect} from '.'

describe('Inspect component', () => {
	it('should render properly', () => {
		const {container} = render(<Inspect data={data} />)
		expect(container).toMatchInlineSnapshot(`
      <div>
        <pre
          style="line-height: 1.25; font-size: 1.25rem; font-family: monospace; padding: 0.75rem; display: inline-block; background-color: transparent;"
        >
          <span>
            <span
              style="font-weight: bold; color: inherit;"
            >
              {
            </span>
            <div
              style="padding-left: 1rem;"
            >
              <span
                style="font-weight: bold; color: #777;"
              >
                und
              </span>
              <span
                style="font-weight: bold; color: inherit;"
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
                style="font-weight: bold; color: #777;"
              >
                nil
              </span>
              <span
                style="font-weight: bold; color: inherit;"
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
                style="font-weight: bold; color: #777;"
              >
                num
              </span>
              <span
                style="font-weight: bold; color: inherit;"
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
                style="font-weight: bold; color: #777;"
              >
                str
              </span>
              <span
                style="font-weight: bold; color: inherit;"
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
                style="font-weight: bold; color: #777;"
              >
                fun
              </span>
              <span
                style="font-weight: bold; color: inherit;"
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
                style="font-weight: bold; color: #777;"
              >
                arr
              </span>
              <span
                style="font-weight: bold; color: inherit;"
              >
                :
              </span>
               
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
            <div
              style="padding-left: 1rem;"
            >
              <span
                style="font-weight: bold; color: #777;"
              >
                obj
              </span>
              <span
                style="font-weight: bold; color: inherit;"
              >
                :
              </span>
               
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
            <span
              style="font-weight: bold; color: inherit;"
            >
              }
            </span>
          </span>
        </pre>
      </div>
    `)
	})

	it('should render properly with gloom theme', () => {
		const {container} = render(<Inspect data={data} theme="gloom" />)
		expect(container).toMatchInlineSnapshot(`
      <div>
        <pre
          style="line-height: 1.25; font-size: 1.25rem; font-family: monospace; padding: 0.75rem; display: inline-block; background-color: #212136;"
        >
          <span>
            <span
              style="font-weight: bold; color: #F1EFF7;"
            >
              {
            </span>
            <div
              style="padding-left: 1rem;"
            >
              <span
                style="font-weight: bold; color: #6DFEDF;"
              >
                und
              </span>
              <span
                style="font-weight: bold; color: #F1EFF7;"
              >
                :
              </span>
               
              <span
                style="font-weight: bold; color: #AE81FF;"
              >
                undefined
              </span>
            </div>
            <div
              style="padding-left: 1rem;"
            >
              <span
                style="font-weight: bold; color: #6DFEDF;"
              >
                nil
              </span>
              <span
                style="font-weight: bold; color: #F1EFF7;"
              >
                :
              </span>
               
              <span
                style="font-weight: bold; color: #AE81FF;"
              >
                null
              </span>
            </div>
            <div
              style="padding-left: 1rem;"
            >
              <span
                style="font-weight: bold; color: #6DFEDF;"
              >
                num
              </span>
              <span
                style="font-weight: bold; color: #F1EFF7;"
              >
                :
              </span>
               
              <span
                style="font-weight: bold; color: #FFDB7D;"
              >
                666
              </span>
            </div>
            <div
              style="padding-left: 1rem;"
            >
              <span
                style="font-weight: bold; color: #6DFEDF;"
              >
                str
              </span>
              <span
                style="font-weight: bold; color: #F1EFF7;"
              >
                :
              </span>
               
              <span
                style="font-weight: bold; color: #6DFEDF;"
              >
                "cawabongaaa!"
              </span>
            </div>
            <div
              style="padding-left: 1rem;"
            >
              <span
                style="font-weight: bold; color: #6DFEDF;"
              >
                fun
              </span>
              <span
                style="font-weight: bold; color: #F1EFF7;"
              >
                :
              </span>
               
              <span
                style="cursor: pointer;"
              >
                <span
                  style="font-weight: bold; color: #ED4781;"
                >
                  fn
                </span>
              </span>
            </div>
            <div
              style="padding-left: 1rem;"
            >
              <span
                style="font-weight: bold; color: #6DFEDF;"
              >
                arr
              </span>
              <span
                style="font-weight: bold; color: #F1EFF7;"
              >
                :
              </span>
               
              <span>
                <span
                  style="font-weight: bold; color: #F1EFF7;"
                >
                  [
                </span>
                <span
                  style="cursor: pointer;"
                >
                  <span
                    style="font-weight: bold; color: #F1EFF7;"
                  >
                    ...
                  </span>
                </span>
                <span
                  style="font-weight: bold; color: #F1EFF7;"
                >
                  ]
                </span>
              </span>
            </div>
            <div
              style="padding-left: 1rem;"
            >
              <span
                style="font-weight: bold; color: #6DFEDF;"
              >
                obj
              </span>
              <span
                style="font-weight: bold; color: #F1EFF7;"
              >
                :
              </span>
               
              <span>
                <span
                  style="font-weight: bold; color: #F1EFF7;"
                >
                  {
                </span>
                <span
                  style="cursor: pointer;"
                >
                  <span
                    style="font-weight: bold; color: #F1EFF7;"
                  >
                    ...
                  </span>
                </span>
                <span
                  style="font-weight: bold; color: #F1EFF7;"
                >
                  }
                </span>
              </span>
            </div>
            <span
              style="font-weight: bold; color: #F1EFF7;"
            >
              }
            </span>
          </span>
        </pre>
      </div>
    `)
	})

	it('should throw an error if the data is circular', () => {
		vi.spyOn(console, 'error').mockImplementation(() => vi.fn())
		expect(() => render(<Inspect data={circ} />)).toThrowError()
		vi.restoreAllMocks()
	})
})
