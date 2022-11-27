import {PropsWithChildren} from 'react'

export function Value({
  children,
  type,
  theme,
}: PropsWithChildren<{
  type: string
  theme: 'gloom' | 'default'
}>) {
  return (
    <span
      style={{
        fontWeight: 'bold',
        color: getColor(theme, type),
      }}
    >
      {children}
    </span>
  )
}

function getColor(theme: 'gloom' | 'default', type: string) {
  switch (theme) {
    case 'gloom': {
      switch (type) {
        case 'string':
          return '#6DFEDF'
        case 'number':
          return '#FFDB7D'
        case 'function':
          return '#ED4781'
        default:
          return '#AE81FF'
      }
    }
    default: {
      switch (type) {
        case 'string':
          return 'green'
        case 'number':
          return 'orange'
        case 'function':
          return 'magenta'
        default:
          return 'purple'
      }
    }
  }
}
