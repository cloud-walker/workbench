# react-inspect

## Installation

```
npm install --save @cloudwalker/react-inspect
```

## Usage

```javascript
import {Inspect} from 'react-inspect'

const data = {
  und: undefined,
  nil: null,
  num: 666,
  str: 'cawabongaaaa!!',
  fun: (a, b) => a + b,
}

data.arr = Object.values(data)
data.obj = {...data}

const Component = () => {
  return (
    <div>
      <h1>Awesome JS data visualization</h1>
      <Inspect data={data} />
    </div>
  )
}
```
