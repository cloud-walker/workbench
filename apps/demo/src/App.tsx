import {useEffect, useId, useRef, useState} from 'react'
import {z} from 'zod'
import {Task, TaskFilter, makeTask} from './task'

const initialTasks = Array.from({length: 50}, makeTask)
const initialState: {tasks: Task[]; filters: readonly TaskFilter[]} = {
  tasks: initialTasks,
  filters: [{field: 'content', operator: 'like', value: 'male'}],
}

function makeTaskPredicate(filters: readonly TaskFilter[]) {
  const taskPredicate = (task: Task) => {
    const matches = filters.map((filter) => {
      if (filter.operator == 'any_of') {
        return filter.value.some((match) => task[filter.field].includes(match))
      }

      if (filter.operator == 'none_of') {
        return !filter.value.some((match) => task[filter.field].includes(match))
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
    <div className="mx-auto flex flex-col gap-2 max-w-prose">
      <header className="flex gap-2">
        <h1>Tasks</h1>
        <ThemePicker />
      </header>
      <div>
        <button className="bg-primary-9 text-gray-1 px-1">add filter</button>

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
      <ul className="flex flex-col gap-1">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskPreview
              task={task}
              onChange={(task) => {
                setState({
                  ...state,
                  tasks: state.tasks.map((t) => (t.id == task.id ? task : t)),
                })
              }}
              onRemove={() => {
                setState({
                  ...state,
                  tasks: state.tasks.filter((t) => t.id != task.id),
                })
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

const Theme = z.enum(['alpha-light', 'alpha-dark', 'beta-light', 'beta-dark'])
type Theme = z.infer<typeof Theme>

function ThemePicker() {
  const [theme, setTheme] = useState<Theme>(() => {
    const raw = localStorage.getItem('demo-theme')
    const parsed = Theme.safeParse(raw)
    return parsed.success ? parsed.data : 'alpha-light'
  })
  const prevTheme = usePrevious(theme)
  if (prevTheme != null) {
    document.body.classList.remove(prevTheme)
  }
  document.body.classList.add(theme)
  return (
    <select
      defaultValue={theme}
      onChange={(e) => {
        const theme = Theme.parse(e.currentTarget.value)
        localStorage.setItem('demo-theme', theme)
        setTheme(theme)
      }}
    >
      {Theme.options.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  )
}

function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
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
    <div className="flex gap-2">
      <input
        type="checkbox"
        className="accent-primary-9"
        id={checkboxId}
        checked={task.isCompleted}
        onChange={(e) => {
          onChange({...task, isCompleted: e.currentTarget.checked})
        }}
      />
      <label htmlFor={checkboxId} className="grow">
        {task.content}
      </label>
      <div>{task.categories.toString()}</div>
      <button onClick={onRemove} className="text-gray-1 bg-critical-9 px-1">
        Remove
      </button>
    </div>
  )
}
