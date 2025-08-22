import type {Meta} from '@storybook/react'
import {data} from '../testUtils'
import {Inspect} from '.'

const meta: Meta<typeof Inspect> = {
	title: 'Inspect',
	component: Inspect,
}

export default meta

export const Default = () => <Inspect data={data} />
export const GloomTheme = () => <Inspect data={data} theme="gloom" />
