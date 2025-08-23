import type {PropsWithChildren} from 'react'

export const Key = ({
	children,
	theme,
}: PropsWithChildren<{theme: 'gloom' | 'default'}>) => {
	return (
		<span
			style={{
				fontWeight: 'bold',
				color: (() => {
					switch (theme) {
						case 'gloom':
							return '#6DFEDF'
						default:
							return '#777'
					}
				})(),
			}}
		>
			{children}
		</span>
	)
}
