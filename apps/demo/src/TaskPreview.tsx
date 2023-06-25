import {useId} from 'react'
import {Task} from './task'

export const TaskPreview = ({
  task,
  onChange,
  onRemove,
}: {
  task: Task
  onChange: (task: Task) => void
  onRemove: () => void
}) => {
  const checkboxId = useId()
  return (
    <div style={{display: 'flex', gap: '0.5em'}}>
      <input
        type="checkbox"
        id={checkboxId}
        checked={task.isCompleted}
        onChange={(e) => {
          onChange({...task, isCompleted: e.currentTarget.checked})
        }}
      />
      <label htmlFor={checkboxId} style={{flexGrow: 1}}>
        {task.content}
      </label>
      <div>{task.categories.toString()}</div>
      <button onClick={onRemove}>Remove</button>
    </div>
  )
}
