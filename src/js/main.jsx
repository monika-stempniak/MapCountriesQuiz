/* global document */
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './scenes/App.jsx'

require('../scss/style.scss')

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
