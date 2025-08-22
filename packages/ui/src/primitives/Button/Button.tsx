import {css, cx} from '@cloudwalker/styled-system/css'
import {createElement} from 'react'

import {arbitraryValue} from '../../panda'

export function Button(props: React.ComponentPropsWithRef<'button'>) {
	return createElement('button', {
		type: 'button',
		...props,
		className: cx(
			props.className,
			css({bg: 'primary', color: arbitraryValue('white')}),
		),
	})
}
