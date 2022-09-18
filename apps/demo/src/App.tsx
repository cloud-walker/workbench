import {faker} from '@faker-js/faker'
import {Fragment, ReactNode, useId, useState} from 'react'
import {makeTask, Task} from './task'

const initialTasks = Array.from({length: 50}, makeTask)
const initialFilters: Array<{
  field: 'isCompleted' | 'content' | 'estimate'
  operator: 'is' | 'is_not' | 'contains' | 'not_contains'
  value: boolean | number | string
}> = []

type FiltersMap = Record<
  string,
  {
    renderFilter: <
      TOperator extends string,
      TValue extends boolean | number | string,
    >(props: {
      operator: TOperator
      value: TValue
      setOperator: (operator: TOperator) => void
      setValue: (value: TValue) => void
      remove: () => void
    }) => ReactNode
    defaultValue: boolean | number | string
    defaultOperator: string
  }
>

const filtersMap: FiltersMap = {
  isCompleted: {
    defaultValue: false,
    defaultOperator: 'is',
    renderFilter: ({setValue, value, remove}) => {
      if (typeof value != 'boolean') {
        throw Error('value must be boolean')
      }
      return (
        <div>
          <div>Task</div>
          <select
            value={value.toString()}
            onChange={(e) => {
              setValue(JSON.parse(e.currentTarget.value))
            }}
          >
            <option value="true">is</option>
            <option value="false">is_not</option>
          </select>
          <div>completed</div>
          <button onClick={remove}>x</button>
        </div>
      )
    },
  },
  content: {
    defaultValue: '',
    defaultOperator: 'contains',
    renderFilter: ({setOperator, setValue, operator, value, remove}) => {
      if (typeof value != 'string') {
        throw Error('value must be string')
      }
      return (
        <div>
          <div>Content</div>
          <select
            value={operator}
            onChange={(e) => {
              setOperator(e.currentTarget.value)
            }}
          >
            <option value="is">is</option>
            <option value="is_not">is_not</option>
            <option value="contains">contains</option>
            <option value="not_contains">not_contains</option>
          </select>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value)
            }}
          />
          <button onClick={remove}>x</button>
        </div>
      )
    },
  },
  estimate: {
    defaultValue: 0,
    defaultOperator: 'is',
    renderFilter: ({remove, operator, value}) => {
      return (
        <div>
          estimate {operator} {JSON.stringify(value)}
          <button onClick={remove}>x</button>
        </div>
      )
    },
  },
}

export function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filters, setFilters] = useState(initialFilters)
  const filteredTasks = tasks.filter((task) => {
    for (const filter of filters) {
      const fieldValue = task[filter.field]
      if (
        typeof filter.value == 'boolean' ||
        typeof filter.value == 'string' ||
        typeof filter.value == 'number'
      ) {
        if (filter.operator == 'is' && filter.value != fieldValue) {
          return false
        }
        if (filter.operator == 'is_not' && filter.value == fieldValue) {
          return false
        }
      }
      if (typeof filter.value == 'string' && typeof fieldValue == 'string') {
        if (
          filter.operator == 'contains' &&
          !new RegExp(filter.value).test(fieldValue)
        ) {
          return false
        }
        if (
          filter.operator == 'not_contains' &&
          new RegExp(filter.value).test(fieldValue)
        ) {
          return false
        }
      }
    }
    return true
  })
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
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5em'}}>
        {filters.map((f, i) => (
          <Fragment key={f.field + f.operator + i}>
            {filtersMap[f.field].renderFilter({
              operator: f.operator,
              value: f.value,
              setOperator: (operator) => {
                setFilters(
                  filters.map((ff, ii) => (ii == i ? {...ff, operator} : ff)),
                )
              },
              setValue: (value) => {
                setFilters(
                  filters.map((ff, ii) => (ii == i ? {...ff, value} : ff)),
                )
              },
              remove: () => {
                setFilters(filters.filter((_, ii) => ii != i))
              },
            })}
          </Fragment>
        ))}
        <button
          onClick={() => {
            const field = faker.helpers.arrayElement([
              'content',
              'isCompleted',
              'estimate',
            ] as const)
            setFilters([
              ...filters,
              {
                field,
                operator: filtersMap[field].defaultOperator,
                value: filtersMap[field].defaultValue,
              },
            ])
          }}
        >
          add filter
        </button>
      </div>
      <pre>{JSON.stringify(filters, null, 2)}</pre>
      <ul style={{display: 'flex', flexDirection: 'column', gap: '0.25em'}}>
        {filteredTasks.map((task) => (
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
