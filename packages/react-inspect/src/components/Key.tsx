import {PropsWithChildren} from 'react'

export function Key({
  children,
  theme,
}: PropsWithChildren<{theme: 'gloom' | 'default'}>) {
  return (
    <span
      style={{
        fontWeight: 'bold',
        color: (() => {
          switch (theme) {
            case 'gloom':
              return '#6DFEDF'
            default:
              return '#777'
          }
        })(),
      }}
    >
      {children}
    </span>
  )
}
