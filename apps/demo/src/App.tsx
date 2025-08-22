import {useState} from 'react'
import {TaskPreview} from './TaskPreview'
import {makeTask, type Task, type TaskFilter} from './task'

const initialTasks = Array.from({length: 50}, makeTask)
const initialState: {tasks: Task[]; filters: readonly TaskFilter[]} = {
	tasks: initialTasks,
	filters: [{field: 'content', operator: 'like', value: 'male'}],
}

const makeTaskPredicate = (filters: readonly TaskFilter[]) => {
	const taskPredicate = (task: Task) => {
		const matches = filters.map((filter) => {
			if (filter.operator === 'any_of') {
				return filter.value.some((match) => task[filter.field].includes(match))
			}

			if (filter.operator === 'none_of') {
				return !filter.value.some((match) => task[filter.field].includes(match))
			}

			if (filter.operator === 'like') {
				return task[filter.field].includes(filter.value)
			}

			if (filter.operator === 'unlike') {
				return !task[filter.field].includes(filter.value)
			}

			return true
		})

		return matches.every(Boolean)
	}
	return taskPredicate
}

export const App = () => {
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
				<button type="button">add filter</button>

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
				{tasks.map((task) => (
					<li key={task.id}>
						<TaskPreview
							task={task}
							onChange={(task) => {
								setState({
									...state,
									tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
								})
							}}
							onRemove={() => {
								setState({
									...state,
									tasks: state.tasks.filter((t) => t.id !== task.id),
								})
							}}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}
