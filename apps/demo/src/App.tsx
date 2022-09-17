import {useId, useState} from 'react'
import {makeTask, Task} from './task'

const initialTasks = Array.from({length: 50}, makeTask)

export function App() {
  const [tasks, setTasks] = useState(initialTasks)
  return (
    <div
      style={{
        maxWidth: '1024px',
        marginInline: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5em',
      }}
    >
      <h1>Tasks</h1>
      <ul style={{display: 'flex', flexDirection: 'column', gap: '0.25em'}}>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskPreview
              task={task}
              onChange={(task) => {
                setTasks(tasks.map((t) => (t.id == task.id ? task : t)))
              }}
              onRemove={() => {
                setTasks(tasks.filter((t) => t.id != task.id))
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

function TaskPreview({
  task,
  onChange,
  onRemove,
}: {
  task: Task
  onChange: (task: Task) => void
  onRemove: () => void
}) {
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
