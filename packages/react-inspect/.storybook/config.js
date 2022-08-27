import {configure} from '@storybook/react'
import 'sanitize.css'

import './main.css'

const req = require.context('../src', true, /\.stories\.js$/)

const loadStories = () => req.keys().forEach(req)

configure(loadStories, module)
