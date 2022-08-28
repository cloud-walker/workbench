import {equals, join, map, pipe, slice, split, when} from 'ramda'

export default pipe(
  split('\n'),
  map(when(pipe(slice(0, 2), equals(' ')), slice(2, Infinity))),
  join('\n'),
)
