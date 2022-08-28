import {PropsWithChildren} from 'react'

const Component = ({
  children,
  theme,
}: PropsWithChildren<{theme: 'gloom' | 'default'}>) => (
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

Component.displayName = 'ReactInspectKey'

export default Component
