import {useState} from 'react'

/**
 * React hook that holds the previous value passed in the previous
 * render phase.
 */
export const usePreviousValue = <T>(value: T): T => {
  const [prevValue, setPrevValue] = useState(value)
  if (value !== prevValue) {
    setPrevValue(value)
  }
  return prevValue
}
