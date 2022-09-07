import {useState} from 'react'

export function usePreviousValue<T>(value: T) {
  const [prevValue, setPrevValue] = useState(value)
  if (value !== prevValue) {
    setPrevValue(value)
  }
  return prevValue
}
