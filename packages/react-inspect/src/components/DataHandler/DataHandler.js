import React from 'react'
import {keys, map, pipe} from 'remeda'

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

    if (typeof data == 'string') {
      return <Value type="string" theme={theme}>{`"${data}"`}</Value>
    }

    if (typeof data == 'number') {
      return <Value type="number" theme={theme}>{`${data}`}</Value>
    }

    if (typeof data == 'function') {
      const value = (
        <Value type="function" theme={theme}>
          {String(data).trim()}
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

    if (Array.isArray(data)) {
      const value = data.map((x, i) => (
        <Level key={i}>
          <Component data={x} theme={theme} />
        </Level>
      ))

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

    if (data != null && typeof data == 'object') {
      const value = pipe(
        data,
        keys,
        map((x) => (
          <Level key={x}>
            <Key theme={theme}>{x}</Key>
            <Punctuation theme={theme}>:</Punctuation>{' '}
            <Component data={data[x]} theme={theme} />
          </Level>
        )),
      )

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
