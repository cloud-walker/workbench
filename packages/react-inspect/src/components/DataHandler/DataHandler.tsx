import {Component} from 'react'

import CollapseHandler from '../CollapseHandler'
import Key from '../Key'
import Level from '../Level'
import Punctuation from '../Punctuation'
import Value from '../Value'

class DataHandler extends Component<{
  theme?: 'gloom' | 'default'
  data?:
    | null
    | undefined
    | number
    | string
    | Record<string, unknown>
    | unknown[]
    | ((...args: any[]) => any)
  outer: boolean
}> {
  static displayName = 'ReactInspectDataHandler'
  static defaultProps = {
    outer: false,
  }

  render() {
    const {data, outer, theme = 'default'} = this.props

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
                show ? (
                  <>{value}</>
                ) : (
                  <Punctuation theme={theme}>...</Punctuation>
                )
              }
            </CollapseHandler>
          )}
          <Punctuation theme={theme}>{']'}</Punctuation>
        </span>
      )
    }

    if (data != null && typeof data == 'object') {
      const value = Object.keys(data).map((x) => (
        <Level key={x}>
          <Key theme={theme}>{x}</Key>
          <Punctuation theme={theme}>:</Punctuation>{' '}
          <Component data={data[x]} theme={theme} />
        </Level>
      ))

      return (
        <span>
          <Punctuation theme={theme}>{'{'}</Punctuation>
          {outer ? (
            value
          ) : (
            <CollapseHandler>
              {(show) =>
                show ? (
                  <>{value}</>
                ) : (
                  <Punctuation theme={theme}>...</Punctuation>
                )
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

export default DataHandler
