import type {PropsWithChildren} from 'react'

export const Punctuation = ({
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
							return '#F1EFF7'
						default:
							return 'inherit'
					}
				})(),
			}}
		>
			{children}
		</span>
	)
}
