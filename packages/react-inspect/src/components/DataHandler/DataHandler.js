import {addIndex, is, keys, map, pipe} from 'ramda'
import React from 'react'

import stripFunction from '../../utils/stripFunction'
import CollapseHandler from '../CollapseHandler'
import Key from '../Key'
import Level from '../Level'
import Punctuation from '../Punctuation'
import Value from '../Value'

const Component = class extends React.Component {
  static displayName = 'ReactInspectDataHandler'
  static defaultProps = {
    outer: false,
  }

  render() {
    const {data, outer, theme} = this.props

    if (is(String)(data)) {
      return <Value type="string" theme={theme}>{`"${data}"`}</Value>
    }

    if (is(Number)(data)) {
      return <Value type="number" theme={theme}>{`${data}`}</Value>
    }

    if (is(Function)(data)) {
      const value = (
        <Value type="function" theme={theme}>
          {stripFunction(String(data))}
        </Value>
      )

      if (outer) {
        return value
      }

      return (
        <CollapseHandler>
          {(show) =>
            show ? value : {...value, props: {...value.props, children: 'fn'}}
          }
        </CollapseHandler>
      )
    }

    if (is(Array)(data)) {
      const value = addIndex(map)((x, i) => (
        <Level key={i}>
          <Component data={x} theme={theme} />
        </Level>
      ))(data)

      return (
        <span>
          <Punctuation theme={theme}>{'['}</Punctuation>
          {outer ? (
            value
          ) : (
            <CollapseHandler>
              {(show) =>
                show ? value : <Punctuation theme={theme}>...</Punctuation>
              }
            </CollapseHandler>
          )}
          <Punctuation theme={theme}>{']'}</Punctuation>
        </span>
      )
    }

    if (is(Object)(data)) {
      const value = pipe(
        keys,
        map((x) => (
          <Level key={x}>
            <Key theme={theme}>{x}</Key>
            <Punctuation theme={theme}>:</Punctuation>{' '}
            <Component data={data[x]} theme={theme} />
          </Level>
        )),
      )(data)

      return (
        <span>
          <Punctuation theme={theme}>{'{'}</Punctuation>
          {outer ? (
            value
          ) : (
            <CollapseHandler>
              {(show) =>
                show ? value : <Punctuation theme={theme}>...</Punctuation>
              }
            </CollapseHandler>
          )}
          <Punctuation theme={theme}>{'}'}</Punctuation>
        </span>
      )
    }

    return <Value type="keyword" theme={theme}>{`${data}`}</Value>
  }
}

export default Component
