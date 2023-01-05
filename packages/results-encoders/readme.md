## Usage

```ts
type Todo = {
  id: number
  createdAt: string
  updatedAt: string
  content: string
  isCompleted: boolean
}
const {resultsFilters, resultsSortings, fieldsFilters, fieldsSortings} =
  makeResultsEncoders<Todo>({
    fields: {
      id: 'id',
      createdAt: 'cat',
      updatedAt: 'uat',
      content: 'cn',
      isCompleted: 'ic',
    },
  })

const encoded1 = resultsFilters.encode([
  {field: 'id', operator: 'any_of', value: [1, 3]},
  {field: 'isCompleted', operator: 'any_of', value: [true]},
]) // 'id:ayo=1,3&ic:ayo=1'
const decoded1 = resultsFilters.decode('id:ayo=1,3&ic:ayo=1')

const encoded1 = resultsSortings.encode([
  {field: 'content', operator: 'asc'},
  {field: 'isCompleted', operator: 'desc'},
]) // cn:a&ic:d
const decoded2 = resultsSortings.decode('cn:a&ic:d')

const encoded3 = fieldsFilters.encode({id: true, isCompleted: true}) // 'id,ic'
const decoded3 = fieldsFilters.decode('id,ic')

const encoded4 = fieldsSortings.encode([
  'id',
  'isCompleted',
  'content',
  'createdAt',
  'updatedAt',
]) // 'id,ic,cn,cat,uat'
const decoded4 = fieldsSortings.decode('id,ic,cn,cat,uat')
```
