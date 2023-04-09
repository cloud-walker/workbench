import {getBySelector} from '@cloudwalker/dom-utils'
import {createRoot} from 'react-dom/client'
import 'virtual:uno.css'

import './global.css'

import {App} from './App'

createRoot(getBySelector('#root')).render(<App />)
