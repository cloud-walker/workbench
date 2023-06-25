import {css, cx} from '@cloudwalker/styled-system/css'
import {ButtonHTMLAttributes, createElement, forwardRef} from 'react'

import {arbitraryValue} from '../../panda'

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function Button(props, ref) {
  return createElement('button', {
    ref,
    className: cx(
      props.className,
      css({bg: 'primary', color: arbitraryValue('white')}),
    ),
    ...props,
  })
})
