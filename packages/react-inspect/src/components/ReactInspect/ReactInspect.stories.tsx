import {storiesOf} from '@storybook/react'

import {Inspect} from '.'
import data from '../../mocks/data'

storiesOf('Inspect', module)
  .add('default', () => <Inspect data={data} />)
  .add('gloom theme', () => <Inspect data={data} theme="gloom" />)
