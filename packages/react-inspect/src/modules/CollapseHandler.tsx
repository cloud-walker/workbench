import type {RenderProp} from '@cloudwalker/react-utils'
import {useState} from 'react'

export const CollapseHandler = ({
	children,
}: {
	children: RenderProp<boolean>
}) => {
	const [show, setShow] = useState(false)

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: "we don't care about accessibility atm"
		// biome-ignore lint/a11y/useKeyWithClickEvents: "we don't care about accessibility atm"
		<span
			onClick={(e) => {
				e.stopPropagation()
				setShow(!show)
			}}
			style={{
				cursor: 'pointer',
			}}
		>
			{children(show)}
		</span>
	)
}
CollapseHandler.displayName = 'ReactInspectCollapseHandler'
