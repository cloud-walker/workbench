import type {Meta, StoryObj} from '@storybook/react'

import {Button} from './Button'

const meta: Meta = {
	component: Button,
}

export default meta

export const Base: StoryObj = {
	render: () => <Button>asd</Button>,
}
