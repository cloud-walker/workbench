import {PropsWithChildren} from 'react'

export function Level({children}: PropsWithChildren<unknown>) {
  return <div style={{paddingLeft: '1rem'}}>{children}</div>
}
