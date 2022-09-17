import {RenderProp} from '@cloudwalker/react-utils'
import {useState} from 'react'

export function CollapseHandler({children}: {children: RenderProp<boolean>}) {
  const [show, setShow] = useState(false)

  return (
    <span
      onClick={(e) => {
        e.stopPropagation()
        setShow(!show)
      }}
      style={{cursor: 'pointer'}}
    >
      {children(show)}
    </span>
  )
}
CollapseHandler.displayName = 'ReactInspectCollapseHandler'
