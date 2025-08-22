import {css, cx} from '../../../styled-system/css'

export function Button(props: React.ComponentPropsWithRef<'button'>) {
	return (
		<button
			type="button"
			{...props}
			className={cx(
				props.className,
				css({
					bg: 'primary',
					color: '[white]',
				}),
			)}
		/>
	)
}
