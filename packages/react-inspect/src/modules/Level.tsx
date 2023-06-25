import {PropsWithChildren} from 'react'

export const Level = ({children}: PropsWithChildren<unknown>) => {
  return <div style={{paddingLeft: '1rem'}}>{children}</div>
}
