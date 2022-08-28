import isCircular from 'just-is-circular'
import {PropsWithoutRef} from 'react'

import DataHandler from '../DataHandler'
import Layout from '../Layout'

const Component = ({
  data,
  theme = 'default',
}: PropsWithoutRef<{
  theme?: 'gloom' | 'default'
  data: Record<string, unknown>
}>) => {
  if (
    data != null &&
    typeof data != 'function' &&
    typeof data == 'object' &&
    isCircular(data)
  ) {
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

Component.displayName = 'ReactInspect'

export default Component
