import {css} from '@cloudwalker/styled-system/css'
import {ButtonHTMLAttributes, forwardRef} from 'react'

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function Button(props, ref) {
  return <button ref={ref} {...props} className={css({bg: 'primary'})} />
})
