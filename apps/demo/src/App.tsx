import {useId, useState} from 'react'
import {makeTask, Task, TaskFilter} from './task'

const initialTasks = Array.from({length: 50}, makeTask)
const initialState: {tasks: Task[]; filters: readonly TaskFilter[]} = {
  tasks: initialTasks,
  filters: [{field: 'content', operator: 'like', value: 'male'}],
}

function makeTaskPredicate(filters: readonly TaskFilter[]) {
  const taskPredicate = (task: Task) => {
    const matches = filters.map(filter => {
      if (filter.operator == 'any_of') {
        return filter.value.some(match => task[filter.field].includes(match))
      }

      if (filter.operator == 'none_of') {
        return !filter.value.some(match => task[filter.field].includes(match))
      }

      if (filter.operator == 'like') {
        return task[filter.field].includes(filter.value)
      }

      if (filter.operator == 'unlike') {
        return !task[filter.field].includes(filter.value)
      }

      return true
    })

    return matches.every(Boolean)
  }
  return taskPredicate
}

export function App() {
  const [state, setState] = useState(initialState)
  const tasks = state.tasks.filter(makeTaskPredicate(state.filters))
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
      <div>
        <button>add filter</button>

        <ul>
          {state.filters.map((filter, i) => {
            return (
              <li key={`${filter.field}_${i}`}>
                <pre>{JSON.stringify(filter, null, 2)}</pre>
              </li>
            )
          })}
        </ul>
      </div>
      <ul style={{display: 'flex', flexDirection: 'column', gap: '0.25em'}}>
        {tasks.map(task => (
          <li key={task.id}>
            <TaskPreview
              task={task}
              onChange={task => {
                setState({
                  ...state,
                  tasks: state.tasks.map(t => (t.id == task.id ? task : t)),
                })
              }}
              onRemove={() => {
                setState({
                  ...state,
                  tasks: state.tasks.filter(t => t.id != task.id),
                })
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
        onChange={e => {
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
