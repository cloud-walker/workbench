import isCircular from 'just-is-circular'
import {PropsWithoutRef} from 'react'

import {DataHandler} from '../DataHandler'
import {Layout} from '../Layout'

export function Inspect({
  data,
  theme = 'default',
}: PropsWithoutRef<{
  theme?: 'gloom' | 'default'
  data: unknown
}>) {
  if (data != null && typeof data == 'object' && isCircular(data)) {
    throw new Error(
      'ReactInspect Error: circular data inspection not supported',
    )
  }

  return (
    <Layout theme={theme}>
      <DataHandler data={data} outer theme={theme} />
    </Layout>
  )
}
