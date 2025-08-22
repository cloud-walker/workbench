import {render} from '@testing-library/react'
import {expect, test} from 'vitest'
import {Inspect} from './main'
import {data} from './modules/testUtils'

test('works properly', () => {
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
