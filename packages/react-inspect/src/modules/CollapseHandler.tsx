import {ReactElement, useState} from 'react'

export function CollapseHandler({
  children,
}: {
  children: (show: boolean) => ReactElement
}) {
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
