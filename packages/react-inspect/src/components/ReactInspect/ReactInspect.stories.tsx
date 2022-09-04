import {ComponentMeta} from '@storybook/react'
import {Inspect} from '.'
import data from '../../mocks/data'

const meta: ComponentMeta<typeof Inspect> = {
  title: 'Inspect',
  component: Inspect,
}

export default meta

export const Default = () => <Inspect data={data} />
export const GloomTheme = () => <Inspect data={data} theme="gloom" />
