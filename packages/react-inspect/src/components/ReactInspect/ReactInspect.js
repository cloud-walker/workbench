import isCircular from 'just-is-circular'
import {allPass, complement, is} from 'ramda'
import React from 'react'

import DataHandler from '../DataHandler'
import Layout from '../Layout'

const Component = ({data, theme}) => {
  if (allPass([complement(is(Function)), is(Object), isCircular])(data)) {
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
