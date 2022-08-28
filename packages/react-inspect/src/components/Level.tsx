import {PropsWithChildren} from 'react'

const Component = ({children}: PropsWithChildren<unknown>) => (
  <div style={{paddingLeft: '1rem'}}>{children}</div>
)

Component.displayName = 'ReactInspectLevel'

export default Component
