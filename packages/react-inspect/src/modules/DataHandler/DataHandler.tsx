import {CollapseHandler} from '../CollapseHandler'
import {Key} from '../Key'
import {Level} from '../Level'
import {Punctuation} from '../Punctuation'
import {Value} from '../Value'

export function DataHandler({
  data,
  outer = false,
  theme = 'default',
}: {
  data: unknown
  outer?: boolean
  theme?: 'gloom' | 'default'
}) {
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
        <DataHandler data={x} theme={theme} />
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
              show ? <>{value}</> : <Punctuation theme={theme}>...</Punctuation>
            }
          </CollapseHandler>
        )}
        <Punctuation theme={theme}>{']'}</Punctuation>
      </span>
    )
  }

  if (isRecord(data)) {
    const value = Object.keys(data).map((x) => (
      <Level key={x}>
        <Key theme={theme}>{x}</Key>
        <Punctuation theme={theme}>:</Punctuation>{' '}
        <DataHandler data={data[x]} theme={theme} />
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
              show ? <>{value}</> : <Punctuation theme={theme}>...</Punctuation>
            }
          </CollapseHandler>
        )}
        <Punctuation theme={theme}>{'}'}</Punctuation>
      </span>
    )
  }

  return <Value type="keyword" theme={theme}>{`${data}`}</Value>
}

DataHandler.displayName = 'ReactInspectDataHandler'

function isRecord(data: unknown): data is Record<string, unknown> {
  return data != null && typeof data == 'object'
}
