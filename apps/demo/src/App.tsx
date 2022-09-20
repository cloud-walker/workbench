import {faker} from '@faker-js/faker'
import {Fragment, ReactNode, useId, useState} from 'react'
import {makeTask, Task} from './task'

type MaybeArray<T> = T | T[]

type FilterValue = MaybeArray<string | number | boolean | Date>

type Filter<
  TField extends string,
  TOperator extends string,
  TValue extends FilterValue,
> = {
  field: TField
  operator: TOperator
  value: TValue
}

type BoolFilter<TField extends string> = Filter<TField, 'is', boolean>
type TextFilter<TField extends string> = Filter<
  TField,
  'is' | 'is_not' | 'contains' | 'not_contains',
  string
>
type NumberFilter<TField extends string> = Filter<
  TField,
  'is' | 'is_not' | 'lt' | 'lte' | 'gt' | 'gte',
  number
>
type ChoicesFilter<TField extends string> = Filter<
  TField,
  'any_of' | 'not_of' | 'all_of',
  string[]
>

type FilterableTaskFields = keyof Pick<
  Task,
  'categories' | 'isCompleted' | 'content'
>

type TaskFilter =
  | BoolFilter<'isCompleted'>
  | TextFilter<'content'>
  | ChoicesFilter<'categories'>

type FilterDef<
  TFilter extends Filter<string, string, FilterValue> = Filter<
    string,
    string,
    FilterValue
  >,
> = {
  defaultValue: TFilter['value']
  defaultOperator: TFilter['operator']
  getDefaultState: () => TFilter
  renderFilter: {
    (props: {
      operator: TFilter['operator']
      value: TFilter['value']
      setValue: (transform: (value: TFilter) => TFilter) => void
      setOperator: (transform: (value: TFilter) => TFilter) => void
      remove: () => void
    }): ReactNode
  }
}

type TaskFiltersDef = {
  [k in FilterableTaskFields]: FilterDef<Extract<TaskFilter, {field: k}>>
}

const initialTasks = Array.from({length: 50}, makeTask)
const initialFilters: TaskFilter[] = []

const filtersDef: TaskFiltersDef = {
  isCompleted: {
    defaultValue: false,
    defaultOperator: 'is',
    getDefaultState: () => ({
      field: 'isCompleted',
      operator: 'is',
      value: false,
    }),
    renderFilter: ({setValue, value, remove}) => {
      return (
        <div style={{display: 'flex'}}>
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
    getDefaultState: () => ({
      field: 'content',
      operator: 'contains',
      value: '',
    }),
    renderFilter: ({setOperator, setValue, operator, value, remove}) => {
      return (
        <div style={{display: 'flex'}}>
          <div>Content</div>
          <select
            value={operator}
            onChange={(e) => {
              setOperator(
                e.currentTarget.value as
                  | 'is'
                  | 'is_not'
                  | 'contains'
                  | 'not_contains',
              )
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
  categories: {
    defaultOperator: 'any_of',
    defaultValue: [],
    getDefaultState: () => ({
      field: 'categories',
      operator: 'any_of',
      value: [],
    }),
    renderFilter: ({operator, setOperator, remove}) => (
      <div style={{display: 'flex'}}>
        <div>Category</div>
        <select
          value={operator}
          onChange={(e) => {
            setOperator(e.currentTarget.value as 'any_of' | 'not_of' | 'all_of')
          }}
        >
          <option value="any_of">any</option>
          <option value="not_of">none</option>
          <option value="all_of">all</option>
        </select>
        <button onClick={remove}>x</button>
      </div>
    ),
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
          !new RegExp(filter.value, 'i').test(fieldValue)
        ) {
          return false
        }
        if (
          filter.operator == 'not_contains' &&
          new RegExp(filter.value, 'i').test(fieldValue)
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
        {filters.map((f, i) => {
          const remove = () => {
            setFilters(filters.filter((ff) => ff != f))
          }

          const filterDef = filtersDef[f.field] as FilterDef
          return (
            <Fragment key={i}>
              {filterDef.renderFilter({
                operator: f.operator,
                remove,
                setOperator: (operator) => {
                  setFilters(filters.map((ff) => (ff != f ? ff : operator(ff))))
                },
                setValue: (value) => {
                  setFilters(filters.map((ff) => (ff != f ? ff : value(ff))))
                },
                value: f.value,
              })}
            </Fragment>
          )
        })}
        <button
          onClick={() => {
            const field = faker.helpers.arrayElement([
              'content',
              'isCompleted',
              'categories',
            ] as const)
            const filterDef = filtersDef[field]
            setFilters([...filters, filterDef.getDefaultState()])
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
